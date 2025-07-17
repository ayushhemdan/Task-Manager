
import { FaRegCalendarAlt, FaTrash } from 'react-icons/fa'
import type { Task } from '../App'

type TasksListType = {
  task: Task,
  handleCheckbox: (value: string) => void,
  handleDelete: (value: string) => void,
  handleEdit: (value: string) => void
}

const TasksList = ({ task, handleCheckbox, handleDelete, handleEdit }: TasksListType) => {
  return (
    <div key={task.id} className={`border rounded-lg  px-7 shadow py-4 mb-2 space-y-3 ${(task.completed) ? 'bg-[rgba(248,248,248,1)]' : ''}`}>
      <div className='flex justify-between items-center w-full'>
        <label className='flex gap-4 items-center cursor-pointer'>
          <input type="checkbox" checked={task.completed} aria-label="toggle task completed" onChange={() => handleCheckbox(task.id)} className={`w-5 h-5  appearance-none  border-2 border-gray-300 rounded-full checked:bg-blue-500 checked:border-transparent`} />
          <span className={`${task.completed ? 'line-through text-gray-500' : ''}`}>{task.text}</span>
        </label>

        <button className='text-red-500 hover:text-red-700' onClick={() => handleDelete(task.id)}><FaTrash /></button>

      </div>

      <div className='flex gap-2 items-center flex-wrap'>
        <span className={`rounded-2xl p-1 text-xs ${(task.priority === 'low') ? 'bg-green-100 text-green-900 border border-green-300' : (task.priority === 'medium') ? 'text-yellow-900 border border-yellow-5 bg-yellow-100' : 'bg-red-100 text-red-900 border border-red-300'}`}>{task.priority}</span>
        <span className='bg-blue-100 rounded-2xl p-1 text-xs text-blue-900 border border-blue-300'>{task.category}</span>
        <span className='text-xs text-gray-500 flex gap-2 justify-center items-center'>< FaRegCalendarAlt />{task.createdAt.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        <button onClick={() => handleEdit(task.id)} className='text-sm text-gray-600 border-2 rounded-xl px-1 ml-auto hover:bg-gray-200'>Edit</button>
      </div>
    </div>

  )
}

export default TasksList