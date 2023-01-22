import { useEffect, useState } from "react";
import { generateDatesFromLastQuarter } from "../utils/generate-dates-from-last-quarter";
import HabitDay from "./HabitDay";
import { api } from "../lib/axios";

const weekDays = 'DSTQQSS'.split("");

const sumaryDates = generateDatesFromLastQuarter();

type SummaryItem = {
    id: string,
    date: string,
    amount: number,
    completed: number
}

function SummaryTable() {

    const [summary, setSummary] = useState<SummaryItem[]>([]);

    useEffect(() => {
        api.get("/summary").then((response) => setSummary(response.data))
    }, []);

    return (
        <div className='w-full flex'>
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((weekDay, index) => (
                    <div
                        key={`${weekDay}-${index}`}
                        className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center"
                    >
                        {weekDay}
                    </div>
                ))}
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {sumaryDates.map((date) => {
                    const dayInSummary = summary.find(day => day.date === date.toJSON())
                    return (
                        <HabitDay
                            key={date.toJSON()}
                            date={date}
                            amount={dayInSummary?.amount || 0}
                            completed={dayInSummary?.completed || 0}
                        />
                    )
                })}
            </div>
        </div>
    )
}
export default SummaryTable;
