import type { Task } from "../App"

type TaskTrackType = {
  tasks: Task[]
}
const TaskTrack = ({tasks}:TaskTrackType) => {
  return (
    <div className='flex justify-around items-center shadow bg-gray-100 rounded p-5'>
       <div className='text-center'>
            <p className='text-blue-800 text-2xl font-bold'>{tasks.length}</p>
            <p className='text-gray-600'>Total Tasks</p>

          </div>
          <div className='text-center'>
            <p className='text-green-800 text-2xl font-bold'>{
              tasks.reduce((count: number, currentTask: Task) => (currentTask.completed) ? count + 1 : count, 0)
            }</p>
            <p className='text-gray-600'>Completed</p>
          </div>
          <div className='text-center'>
            <p className='text-red-00 text-2xl font-bold'>{
              tasks.reduce((count: number, currentTask: Task) => (!currentTask.completed) ? count + 1 : count, 0)
            }</p>
            <p className='text-gray-600'>Remaining</p>
          </div>
    </div>
  )
}

export default TaskTrack