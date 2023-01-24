import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../lib/axios";
import dayjs from "dayjs";

interface HabitsListProps {
    date: Date;
    onCompletedChanged?: (completed: number) => void;
}

interface HabitsInfo {
    possibleHabits: Array<{
        id: string;
        title: string;
        created_at: string;
    }>,
    completedHabits: string[]
}

function HabitsList(props: HabitsListProps) {

    const {
        date,
        onCompletedChanged
    } = props;

    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

    const isDateInPast = useMemo(
        () => dayjs(date).endOf('day').isBefore(new Date()),
        [date]
    );

    const handleToggleHabit = useCallback(async (habitId: string) => {
        if (!habitsInfo) return;

        await api.patch(`/habits/${habitId}/toggle`);

        const newCompletedList = [...habitsInfo.completedHabits];

        const isHabitAlreadyCompleted = habitsInfo.completedHabits.includes(habitId);
        if (isHabitAlreadyCompleted) {
            newCompletedList.splice(newCompletedList.indexOf(habitId), 1);
        } else {
            newCompletedList.push(habitId);
        }

        setHabitsInfo({
            ...habitsInfo,
            completedHabits: newCompletedList
        });

        onCompletedChanged && onCompletedChanged(newCompletedList.length);
    }, [api, habitsInfo])

    useEffect(() => {
        api.get(
            "/day",
            {
                params: {
                    date: date.toJSON()
                }
            })
            .then((response) => {
                setHabitsInfo(response.data);
            })
    }, []);

    return (
        <div className="mt-6 flex flex-col gap-3">

            {habitsInfo?.possibleHabits.map(habit => (
                <Checkbox.Root
                    key={habit.id}
                    className='flex items-center group focus:outline-none'
                    disabled={isDateInPast}
                    checked={habitsInfo.completedHabits.includes(habit.id)}
                    onCheckedChange={() => handleToggleHabit(habit.id)}
                >
                    <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors  group-focus:outline-none group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-background'>
                        <Checkbox.Indicator>
                            <Check size={20} color='white' />
                        </Checkbox.Indicator>
                    </div>

                    <span className='font-semibold text-xl leading-tight ml-2 group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                        {habit.title}
                    </span>
                </Checkbox.Root>
            ))}
        </div>
    )
}
export default HabitsList;
