import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { FileText, LogOut, Menu, Pencil, User, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { auth } from "../redux/userSlice.js";

export default function Navbar() {
  const isLogin = useSelector(state => state.app.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const Logout = async () => {
    try {
      const response = await fetch("https://bloggingapp-backend-lpr6.vercel.app/user/logout" , {
        method : "GET",
        credentials : "include"
      })
      const res = await response.json()
      const {success , message} = res
      if (success) {
        toast.success(message)
        dispatch(auth(null))
        navigate("/login")
      }
    } catch (error) {
      alert(error.message)
      console.log(error);
    }
  }
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            BlogHub
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {["Home", "About", "Blogs"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="group relative text-sm font-medium text-gray-600 hover:text-black"
              >
                {item}
                <span className="absolute -bottom-2 left-0 h-[2px] w-full scale-x-0 bg-gradient-to-r from-indigo-500 to-pink-500 transition-transform group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">

            {/* Desktop Auth */}
            <div className="hidden md:flex">
              {isLogin ? (
                <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Avatar className="h-9 w-9 cursor-pointer">
      <AvatarImage src={isLogin.image} />
      <AvatarFallback>
        {isLogin.firstname?.[0]?.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  </DropdownMenuTrigger>

  <DropdownMenuContent
    align="end"
    className="w-56 rounded-xl"
  >
    <DropdownMenuLabel className="text-sm font-semibold">
      {isLogin.firstname}
    </DropdownMenuLabel>

    <DropdownMenuSeparator />

    {/* Profile */}
    <DropdownMenuItem asChild>
      <Link
        to="/dashboard/profile"
        className="flex items-center gap-3 w-full"
      >
        <User size={16} />
        <span>Profile</span>
      </Link>
    </DropdownMenuItem>

    {/* Write Blog */}
    <DropdownMenuItem asChild>
      <Link
        to="/dashboard/createBlogs"
        className="flex items-center gap-3 w-full"
      >
        <Pencil size={16} />
        <span>Write Blog</span>
      </Link>
    </DropdownMenuItem>

    {/* My Blogs */}
    <DropdownMenuItem asChild>
      <Link
        to="/dashboard/userBlogs"
        className="flex items-center gap-3 w-full"
      >
        <FileText size={16} />
        <span>My Blogs</span>
      </Link>
    </DropdownMenuItem>

    <DropdownMenuSeparator />

    {/* Logout */}
    <DropdownMenuItem
      className="text-red-500 focus:text-red-500 flex items-center gap-3 cursor-pointer"
      onClick = {Logout}
    >
      <LogOut />
      <span>Logout</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

              ) : (
                <div className="flex gap-2">
                  <Button
                    asChild
                    className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                  >
                    <Link to="/signup">Signup</Link>
                  </Button>

                  <Button asChild variant="outline" className="rounded-full">
                    <Link to="/login">Signin</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="flex flex-col gap-4 p-4">
            {["Home", "About", "Blogs"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-base font-medium text-gray-700"
                onClick={() => setOpen(false)}
              >
                {item}
              </Link>
            ))}

            {!isLogin ? (
              <div className="flex flex-col gap-3 pt-2">
                <Button asChild className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                  <Link to="/signup" onClick={() => setOpen(false)}>
                    Signup
                  </Link>
                </Button>

                <Button asChild variant="outline" className="w-full">
                  <Link to="/login" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                </Button>
              </div>
            ) : (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <div className="flex items-center gap-3 cursor-pointer">
        <Avatar className="h-10 w-10">
          <AvatarImage src={isLogin.image} />
          <AvatarFallback>
            {isLogin.firstname?.[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium">{isLogin.firstname}</span>
      </div>
    </DropdownMenuTrigger>

    <DropdownMenuContent className="w-56">
      <DropdownMenuItem asChild>
        <Link
          to="/profile"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 w-full"
        >
          <User size={16} />
          Profile
        </Link>
      </DropdownMenuItem>

      <DropdownMenuItem asChild>
        <Link
          to="/write"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 w-full"
        >
          <Pencil size={16} />
          Write Blog
        </Link>
      </DropdownMenuItem>

      <DropdownMenuItem asChild>
        <Link
          to="/my-blogs"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 w-full"
        >
          <FileText size={16} />
          My Blogs
        </Link>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        onClick={() => {
          Logout();
          setOpen(false);
        }}
        className="text-red-500 flex items-center gap-3"
      >
        <LogOut size={16} />
        Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)
}
          </div>
        </div>
      )}
    </nav>
  );
}
