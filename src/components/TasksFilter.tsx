
type TaskFiltertype = {
  setFiltering: (value: string) => void ,
  filtering: string,
  handleDelCompleted: () => void
}

const TasksFilter = ({setFiltering, filtering, handleDelCompleted}:TaskFiltertype) => {
  return (

       <div className='flex justify-between flex-wrap gap-3'>
            <div className='flex flex-wrap gap-3'>
              <button className={` rounded-lg px-3 py-1 shadow transition ${(filtering === 'All') ? 'bg-blue-600 text-white' : 'bg-gray-100'}`} onClick={() => setFiltering('All')}>All</button>
              <button className={`rounded-lg px-3 py-1 shadow ${(filtering === 'Active') ? 'bg-blue-600 text-white' : 'bg-gray-100'}`} onClick={() => setFiltering('Active')}>Active</button>
              <button className={`rounded-lg px-3 py-1 shadow ${(filtering === 'Completed') ? 'bg-blue-600 text-white' : 'bg-gray-100'}`} onClick={() => setFiltering('Completed')}>Completed</button>
            </div>
            <button className='text-red-600' onClick={handleDelCompleted}>Clear Completed</button>
          </div>

  )
}

export default TasksFilter