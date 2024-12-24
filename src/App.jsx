import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ParentComponent from "./components/parent";
import Contact from "./components/contact";
import News from "./components/news";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Layout from "./components/layout";
import { Link } from "react-router-dom";
import Regestration from "./components/regestration";

const routes = createBrowserRouter([
    {
      path:"/",
      element: <Layout/>,
      children:[
        {
          path:"home",
          index:true,
          element:<ParentComponent/>
        },

        {
          path:"news",
          element:<News/>
        },
        {
          path:"contact",
          element: <Contact/>
        },
        {
          path:"regestration",
          element:<Regestration/>
        }
      ]
    },
])
function App() {

  return (
    <>
      <RouterProvider router={routes} />
    </>
    
  );
}

export default App;
