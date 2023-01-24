import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import ProgressBar from './ProgressBar';
import dayjs from 'dayjs';
import HabitsList from './HabitsList';
import { useEffect, useState } from 'react';

interface HabitDayProps {
    date: Date;
    amount: number;
    completed: number;
}

function HabitDay(props: HabitDayProps) {

    const {
        amount,
        completed: completedFromProps,
        date,
    } = props;

    const [completed, setCompleted] = useState(completedFromProps);
    useEffect(() => setCompleted(completedFromProps), [completedFromProps])

    const completedPercentage = amount && 100 * completed / amount;

    const day = dayjs(date);
    const dayAndMonth = day.format("DD/MM");
    const dayOfWeek = day.format("dddd");

    function handleCompletedChanged(completed: number) {
        setCompleted(completed);
    }

    return (
        <Popover.Root>
            <Popover.Trigger
                className={clsx(
                    "w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background",
                    {
                        "bg-zinc-900 border-zinc-800": completedPercentage == 0,
                        "bg-violet-900 border-violet-700": completedPercentage > 0 && completedPercentage < 20,
                        "bg-violet-800 border-violet-600": completedPercentage >= 20 && completedPercentage < 40,
                        "bg-violet-700 border-violet-500": completedPercentage >= 40 && completedPercentage < 60,
                        "bg-violet-600 border-violet-500": completedPercentage >= 60 && completedPercentage < 80,
                        "bg-violet-500 border-violet-400": completedPercentage >= 80,
                    }
                )}
            />
            <Popover.Portal>
                <Popover.Content side='right' className='min-w-[320px] w-full p-6 rounded-2xl bg-zinc-900 flex flex-col focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background'>
                    <span className='font-semibold text-zinc-400 capitalize'>{dayOfWeek}</span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>

                    <ProgressBar progress={completedPercentage} />

                    <HabitsList date={date} onCompletedChanged={handleCompletedChanged} />

                    <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}

export default HabitDay;