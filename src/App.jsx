import { Login } from "./components/Authentication/Login/Login";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './components/Home/Home.jsx'
import { Users } from './components/Users/Users.jsx'
import { Profile } from './components/Profile/Profile.jsx'
import { Layout } from './components/Layouts/Layout.jsx'
// import {NextUIProvider} from "@nextui-org/react";
export default function App() {
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
  return (
    <RouterProvider router={router}/>
  );
}
