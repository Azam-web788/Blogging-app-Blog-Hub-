import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Createblog from "./pages/Createblog";
import Userblogs from "./pages/Userblogs";
import Singleuser from "./pages/Singleuser";

const router = createBrowserRouter([
  {
    path : "/",
    element : <Home />
  },
  {
    path : "/login",
    element : <Login />
  },
  {
    path : "/signup",
    element : <Signup />
  },
  {
    path : "/about",
    element : <About />
  },
  {
    path : "/blogs",
    element : <Blogs />,
  },
  {
    path : "/view/:id",
    element : <Singleuser />,
  },
  {
    path : "/dashboard",
    element : <Dashboard />,
    children : [
      {
        path : "profile",
        element : <Profile />
      },
      {
        path : "createBlogs",
        element : <Createblog />
      },
      {
        path : "userBlogs",
        element : <Userblogs />
      },
    ]
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}