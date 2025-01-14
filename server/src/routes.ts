import dayjs from "dayjs";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import { Day, Habit, Prisma } from "@prisma/client";

import dayjsPluginUtc from "dayjs/plugin/utc";
dayjs.extend(dayjsPluginUtc);

export async function appRoutes(app: FastifyInstance) {

    app.post("/habits", async (req) => {
        const createHabitBody = z.object({
            title: z.string(),
            weekDays: z.array(
                z.number().min(0).max(6)
            )
        })

        const { title, weekDays } = createHabitBody.parse(req.body);

        const today = dayjs.utc().startOf('day').toDate()

        await prisma.habit.create({
            data: {
                title,
                created_at: today,
                weekDays: {
                    create: weekDays.map(weekDay => ({ week_day: weekDay }))
                }
            },
        })
    });

    app.get("/day", async (req) => {
        const getDayParams = z.object({
            date: z.coerce.date(),
        });

        const { date } = getDayParams.parse(req.query);

        const parsedDate = dayjs.utc(date).startOf("day").toDate();
        const week_day = parsedDate.getUTCDay();

        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at: {
                    lte: date,
                },
                weekDays: {
                    some: {
                        week_day: week_day
                    }
                }
            }
        });

        const day = await prisma.day.findUnique({
            where: {
                date: parsedDate
            },
            include: {
                dayHabits: true
            }
        });
        const completedHabits = (day?.dayHabits || []).map(({ habit_id }) => habit_id)

        return {
            possibleHabits,
            completedHabits
        }
    })

    app.patch("/habits/:id/toggle", async (req) => {
        const toggleHabitParams = z.object({
            id: z.string().uuid()
        });

        const { id } = toggleHabitParams.parse(req.params);

        const today = dayjs().utc().startOf('day').toDate();

        let day = await prisma.day.findUnique({
            where: {
                date: today,
            }
        });

        if (!day) {
            day = await prisma.day.create({
                data: {
                    date: today,
                }
            })
        }


        const dayHabit = await prisma.dayHabit.findUnique({
            where: {
                day_id_habit_id: {
                    day_id: day.id,
                    habit_id: id
                }
            }
        });

        if (dayHabit) {
            await prisma.dayHabit.delete({
                where: {
                    id: dayHabit.id
                }
            });
        } else {
            // Completar o hábito no dia
            await prisma.dayHabit.create({
                data: {
                    day_id: day.id,
                    habit_id: id
                }
            })
        }
    })

    app.get("/summary", async (req) => {
        type ReturnValue = Array<{ id: Day["id"], date: Day["date"], amount: number, completed: number }>;

        const summary: ReturnValue = await prisma.$queryRaw`
            SELECT 
                D.id,
                D.date,
                (
                    SELECT
                        cast(COUNT(*) as float)
                    FROM
                        day_habits DH
                    WHERE
                        DH.day_id = D.id
                ) AS completed,
                (
                    SELECT
                        cast(COUNT(*) as float)
                    FROM
                        habit_week_days HWD
                        JOIN habits H
                          ON HWD.habit_id = H.id
                    WHERE
                        HWD.week_day = cast(strftime('%w', D.date / 1000.0, 'unixepoch') as int)
                        AND H.created_at <= D.date
                ) as amount
            FROM 
                days D
        `

        return summary;
    })
}
