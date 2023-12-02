import { Login } from "./components/Authentication/Login/Login";
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import { Home } from './components/Home/Home.jsx'
import { Users } from './components/Users/Users.jsx'
import { Profile } from './components/Profile/Profile.jsx'
import { Layout } from './components/Layouts/Layout.jsx'
import { Inventory } from "./components/Inventory/Inventory.jsx";
import { ProtectedRouter } from "./components/Protected/ProtectedRouter.jsx";
import { Reserve } from "./components/Reserve/Reserve.jsx";
import { useEffect } from "react";
// import {NextUIProvider} from "@nextui-org/react";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>
    },
    {
      element: <ProtectedRouter><Layout/></ProtectedRouter>,
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
        {
          path: "/inventory",
          element: <Inventory />
        },
        {
          path: "/reserve",
          element: <Reserve />
        },
        {
          path: "*",
          element: <Redirect />
        },
      ]
    }
  ]);
  return (
    <RouterProvider router={router}/>
  );
}


export const Redirect = () => {
  const navigate = useNavigate();

  useEffect(()=> {
    navigate(-1)
  },[navigate]);

  return null
}