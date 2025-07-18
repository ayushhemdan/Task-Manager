import { useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import TaskInput from './components/TaskInput';
import { useTasks } from './components/context/TaskContext';
import TasksFilter from './components/TasksFilter';
import TasksList from './components/TasksList';
import TaskTrack from './components/TaskTrack';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'


export type Task = {
  id: string,
  text: string,
  completed: boolean,
  createdAt: Date,
  priority: string,
  category: string
}

export type Action =
  | { type: 'ADD_TASK', payload: Task }
  | { type: 'DELETE_TASK', payload: string }
  | { type: 'TOGGLE_COMPLETE', payload: string }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'EDIT_TASK', payload: Task };



const App = () => {

  const { tasks, dispatch, priority, category, setCategory, editId, setEditId, filtering, setFiltering, setIsAdded } = useTasks();

  const tval = useRef<HTMLInputElement>(null)
  const useCategory = useRef<HTMLInputElement>(null)
  const usePriority = useRef<HTMLSelectElement>(null)

  const handleDelete = (id: any) => {
    dispatch({ type: 'DELETE_TASK', payload: id })
  }

  const handleNewTask = () => {
    if (!tval.current?.value) return;
    setIsAdded(true);
    const t = {
      id: uuidv4(),
      text: tval.current.value,
      completed: false,
      createdAt: new Date(),
      category,
      priority

    }

    dispatch({ type: 'ADD_TASK', payload: t })
    if (useCategory.current) {
      useCategory.current.value = '';
    }
    tval.current.value = '';
    console.log(tasks)
    setTimeout(() => {
      setIsAdded(false);
    }, 1000)
  }

  const handleCheckbox = (id: any) => {

    dispatch({ type: 'TOGGLE_COMPLETE', payload: id })

  }

  useEffect(() => {

    localStorage.setItem('data', JSON.stringify(tasks));
  }, [tasks])


  const handleDelCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' })
  }


  const handleEdit = (id: any) => {
    setEditId(id);

    tval.current?.focus();
    const index = tasks.findIndex((t: Task) => t.id === id)
    console.log('text', tasks[index].text)
    console.log('text', tval.current?.value)
    if (tval.current) {
      tval.current.value = tasks[index].text;
    }
  }

  const handleSave = () => {
    console.log(editId)
    if (!tval.current?.value.trim()) {
      if (useCategory.current) {
        useCategory.current.value = '';
      }
      setCategory('General')
      if (tval.current) {
        tval.current.value = '';
      }
      setEditId('')
      return;
    }
    if (editId) {

      const t =
        tasks.find((t: Task) => t.id === editId);
      console.log(t);
      // {t... , text: tval.current.value, createdAt: new Date(),  priority: usePriority.current.value, category: useCategory.current.value !== '' ? useCategory.current.value : 'General' }
      dispatch({
        type: 'EDIT_TASK', payload: { ...t!, text: tval.current.value, priority: usePriority.current?.value ?? 'low', category: useCategory.current?.value?.trim() || 'General' }
      })
      if (useCategory.current) {
        useCategory.current.value = '';
      }
      setCategory('General')
      tval.current.value = '';
      setEditId('')
    }
  }

  const total = tasks.length;
  const totalCompleted = tasks.filter(t => t.completed).length;
  const percentage = (total > 0) ? Math.round(totalCompleted * 100 / total) : 0;

  return (
    <div>

      <div className="container space-y-6 m-auto mt-5 w-full px-5 lg:max-w-[45vw]">
        <section>

          <div className='mb-3'>
            <h1 className='text-3xl font-bold'>Task Manager</h1>
          </div>

          <div>
            <p className='mb-3 text-gray-600'>{totalCompleted} of {total} tasks completed</p>
            <div className='w-full bg-gray-300 rounded-xl'>
              <div className={`transition-all duration-300 ease-in-out w-[${percentage}%] py-1 bg-blue-800 rounded-xl`}></div>
            </div>
          </div>

        </section>
        <section>

          <TaskInput
            tval={tval}
            handleNewTask={handleNewTask}
            handleSave={handleSave}
            usePriority={usePriority}
            useCategory={useCategory}
          />
        </section>


        <section>
          <TasksFilter
            filtering={filtering}
            setFiltering={setFiltering}
            handleDelCompleted={handleDelCompleted}
          />

        </section>


        <main>

          <div>
            <div>
              {
                (tasks.length === 0) && <p className='text-center p-5 text-gray-700'>Looks like you haven't added any tasks yet!</p>
              }
            </div>
            {
              (filtering === 'All') ?
                tasks.map((task: Task) => (
                  < TasksList key={task.id}
                    task={task}
                    handleCheckbox={handleCheckbox}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}

                  />
                )) : (filtering === 'Active') ?
                  tasks.map((task: Task) => (!task.completed) && (
                    < TasksList key={task.id}
                      task={task}
                      handleCheckbox={handleCheckbox}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}

                    />
                  )) :
                  tasks.map((task: Task) => (task.completed) && (
                    < TasksList key={task.id}
                      task={task}
                      handleCheckbox={handleCheckbox}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}

                    />
                  ))

            }

          </div>

        </main>



        <div>
          < TaskTrack
            tasks={tasks}
          />
        </div>

      </div>
      {/* <ToastContainer/> */}

    </div>
  )
}

export default App