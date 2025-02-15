import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import router from './routes/index.jsx';
import { RouterProvider } from 'react-router-dom';
import axios from 'axios';
import store from './store/index.jsx';
import { Provider } from 'react-redux';
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
