import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { TaskProvider } from './components/context/TaskContext.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TaskProvider>
    <App />
    </TaskProvider>
  </StrictMode>
)
