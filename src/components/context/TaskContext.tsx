import  { createContext, useContext, useReducer, useState } from "react";
import type{ ReactNode, SetStateAction } from "react";
import  type{ Task } from "../../App";
import type { Action } from "../../App";

export type TaskContextType = {
  tasks: Task[],
  dispatch: React.Dispatch<Action>,
  priority: string,
  setPriority: React.Dispatch<SetStateAction<string>>,
  category: string,
  setCategory: React.Dispatch<SetStateAction<string>>,
  editId: string,
  setEditId: React.Dispatch<SetStateAction<string>>,
  filtering: string,
  setFiltering: React.Dispatch<SetStateAction<string>> ,
  // tval: React.RefObject<HTMLInputElement| null>,
  // usePriority: React.RefObject<HTMLSelectElement | null>,
  // useCategory: React.RefObject<HTMLInputElement | null>,

}

  const intialStateOfTasks = () => {
    const stored = localStorage.getItem('data');
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return parsed.map((task: Task) => (
      { ...task, createdAt: new Date(task.createdAt) }
    ));
  }

const tasksReducer = (state: Task[], action: Action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload];

    case 'DELETE_TASK':
      return state.filter((t: Task) => t.id !== action.payload);

    case 'TOGGLE_COMPLETE':
      return state.map((t: Task) => (t.id === action.payload) ? { ...t, completed: !t.completed } : t);

    case 'CLEAR_COMPLETED':
      return state.filter((t: Task) => !t.completed);

    case 'EDIT_TASK':
      return state.map((t: Task) => (t.id === action.payload.id) ? action.payload : t);

    default:
      return state;
  }

}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({children} : {children : ReactNode}) =>{
const [tasks, dispatch] = useReducer(tasksReducer, undefined, intialStateOfTasks);


    const [priority, setPriority] = useState<string>('low');
    const [category, setCategory] = useState<string>('General');
    const [editId, setEditId] = useState<string>('');
    // const [completed, setCompleted] = useState<string>('');
    const [filtering, setFiltering] = useState('All');
  
 return (
<TaskContext.Provider value = {{tasks, dispatch, priority, setPriority, category, setCategory, editId, setEditId, filtering, setFiltering}} >
  {children}
</TaskContext.Provider>
 )
}

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};