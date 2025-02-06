import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import router from './routes/index.jsx'
import { RouterProvider } from 'react-router-dom'
import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

