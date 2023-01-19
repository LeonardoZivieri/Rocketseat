import { generateDatesFromLastQuarter } from "../utils/generate-dates-from-last-quarter";
import HabitDay from "./HabitDay";

const weekDays = 'DSTQQSS'.split("");

const sumaryDates = generateDatesFromLastQuarter();

function SummaryTable() {

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
                {sumaryDates.map((date) => (
                    <HabitDay key={date.toJSON()} />
                ))}
            </div>
        </div>
    )
}
export default SummaryTable;
