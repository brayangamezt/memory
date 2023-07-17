import React from 'react';
import ReactDOM from 'react-dom/client';
import FirstScreen from './routes/FirstScreen';
import SecondScreen from './routes/SecondScreen';
import { createBrowserRouter, RouterProvider,Route } from 'react-router-dom';
import './index.css'

const router = createBrowserRouter([
  {path:'/memory/', element: <FirstScreen/>},
  {path:'/memory/game', element: <SecondScreen/>}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
