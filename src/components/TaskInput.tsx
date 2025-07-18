import React from 'react'
import { useTasks } from './context/TaskContext'

type InputTypes = {
  tval: React.RefObject<HTMLInputElement | null>;
  handleNewTask: () => void;
  handleSave: () => void;
  usePriority: React.RefObject<HTMLSelectElement | null>;
  useCategory: React.RefObject<HTMLInputElement | null>;
};

const TaskInput = ({ tval, handleNewTask, handleSave, usePriority, useCategory }: InputTypes) => {
  const { editId, priority, setPriority, setCategory, isAdded } = useTasks();

  return (
    <div>
      <div className='bg-[rgb(249,250,251)] border rounded p-4 shadow-lg'>
        <div className='w-full flex gap-2 mb-3'>
          <input type="text" ref={tval} className='border flex-2 shadow border-gray-300 p-2 rounded-lg w-full focus:ring-2 outline-none' placeholder='Add a new task...' />
          {

            (editId === '') &&
            <button className='whitespace-nowrap  flex-1 w-full text-white rounded-lg px-5 py-2 bg-blue-800' onClick={handleNewTask}>{isAdded ? <span className='text-green-600 font-semibold'>✓ Added</span> : <span>+ Add</span>}</button>
          }
          {
            (editId.length > 0) &&
            <button className='whitespace-nowrap  flex-1 w-full text-white rounded-lg px-5 py-2 bg-green-800' onClick={handleSave}>Save</button>
          }
        </div>

        <div className='flex gap-2'>
          <select ref={usePriority} name="priority" id="priority" className='border rounded px-4 py-1 w-full lg:max-w-[20%]'
            value={priority}
            onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <input type="text" ref={useCategory}
            onChange={(e) => setCategory((e.target.value || 'General'))} placeholder='Category (optional)' className='border rounded px-4 py-1 w-full lg:max-w-[20%]' />
        </div>
      </div>
    </div>
  )
}

export default TaskInput