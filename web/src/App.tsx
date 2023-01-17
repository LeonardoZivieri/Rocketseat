import { useState } from 'react'
import Habit from './components/habit'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-screen w-screen bg-zinc-900 text-white'>
      <Habit completed={3} />
      <Habit completed={10} />
      <Habit completed={20} />
      <Habit completed={30} />
    </div>
  )
}

export default App
