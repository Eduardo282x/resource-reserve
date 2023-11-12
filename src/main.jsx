import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import { Login } from './components/Authentication/Login/Login.jsx'
import { Home } from './components/Home/Home.jsx'
import { Users } from './components/Users/Users.jsx'
import { Profile } from './components/Profile/Profile.jsx'
import { Layout } from './components/Layouts/Layout.jsx'
// import {NextUIProvider} from "@nextui-org/react";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    element: <Layout/>,
    children: [
      {
        path: "/home",
        element: <Home/>
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/profile",
        element: <Profile />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <CssBaseline />
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
