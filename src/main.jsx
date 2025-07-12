import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Route,createRoutesFromElements } from 'react-router-dom'
import ToDoCard from './components/Card/ToDoCard.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
    <Route path='/tasks' element={<ToDoCard/> }/>


    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
        {/* <RouterProvider router={router} /> */}
  </StrictMode>,
)
