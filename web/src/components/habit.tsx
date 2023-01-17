
interface HabitProps {
    completed: number
}

export default function Habit(props: HabitProps) {
    return (
        <p className="h-10 w-10 inline-flex items-center justify-center rounded border hover:border-2 border-zinc-100 m-1">{props.completed}</p>
    )
}