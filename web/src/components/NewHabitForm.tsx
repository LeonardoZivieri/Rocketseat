import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from '../lib/dayjs';
import { Check } from "phosphor-react";
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { api } from '../lib/axios';

const availableWeekDays = (() => {
    const capitalize = (str: string, lower = false) =>
        (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{\-])+\S/g, match => match.toUpperCase());
    ;
    return Array.from({ length: 7 }).map((_, weekDay) => {
        return capitalize(dayjs(0).utc().startOf('week').add(weekDay, "days").format("dddd"));
    })
})();

function NewHabitForm() {

    const [title, setTitle] = useState('');
    const [weekDays, setWeekDays] = useState<boolean[]>(availableWeekDays.map(() => false));

    const handleToggleWeekDay = useCallback((weekDayIndex: number) => {
        weekDays[weekDayIndex] = !weekDays[weekDayIndex];
        setWeekDays([...weekDays].map(Boolean));
    }, [weekDays])

    async function createNewHabit(ev: FormEvent) {
        ev.preventDefault();

        const selectedWeekDays = weekDays.map((wd, i) => wd && i).filter(Boolean)
        const newHabit = {
            title,
            weekDays: selectedWeekDays
        };

        if (!newHabit.title || newHabit.weekDays.length === 0) {
            return;
        }

        await api.post("/habits", newHabit);

        setTitle("");
        setWeekDays(weekDays.map(() => false));

        alert("Hábito criado com sucesso");
    }

    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <div className="my-2 flex flex-col">
                <label htmlFor="newHabitFormTitle" className="font-semibold leading-tight">
                    Qual seu comprometimento?
                </label>
                <input
                    type="text"
                    id="newHabitFormTitle"
                    placeholder="For example: Study, eat fruits, etc..."
                    autoFocus
                    className="p-4 mt-3 text-white placeholder:text-zinc-400 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>

            <div className="my-2 flex flex-col">
                <label htmlFor="" className="font-semibold leading-tight">
                    Qual a recorrência?
                </label>
            </div>

            <div className="flex flex-col gap-2 mt-3">
                {availableWeekDays.map((weekDay, index) => (
                    <Checkbox.Root
                        key={weekDay}
                        className='flex items-center group'
                        checked={weekDays[index]}
                        onCheckedChange={() => handleToggleWeekDay(index)}
                    >
                        <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
                            <Checkbox.Indicator>
                                <Check size={20} color='white' />
                            </Checkbox.Indicator>
                        </div>

                        <span className='font-semibold leading-tight ml-2'>
                            {weekDay}
                        </span>
                    </Checkbox.Root>
                ))}
            </div>

            <button
                type="submit"
                className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500"
            >
                <Check size={20} weight="bold" />
                Confirmar
            </button>
        </form>
    )
}
export default NewHabitForm;
