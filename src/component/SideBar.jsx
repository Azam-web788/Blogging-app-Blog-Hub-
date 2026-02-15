import React from "react";
import { User, PenSquare, FileText, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { auth } from "../redux/userSlice";

export default function Sidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  async function Logout() {
    try {
      const response = await fetch("https://bloggingapp-backend-dci1.vercel.app/user/logout" , {
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
      alert("server error")
      console.log(error);
      
    }
  }
  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:flex h-screen w-64 bg-zinc-900 text-white flex-col fixed left-0 top-0">
        {/* Logo */}
        <div className="p-6 text-2xl font-extrabold border-b border-zinc-800 tracking-wide">
          Dashboard
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem to="/dashboard/profile" icon={<User size={20} />} label="Profile" />
          <SidebarItem to="/dashboard/createBlogs" icon={<PenSquare size={20} />} label="Create Blogs" />
          <SidebarItem to="/dashboard/userBlogs" icon={<FileText size={20} />} label="See Blogs" />
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-zinc-800">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-zinc-800 hover:bg-red-600 transition" onClick={Logout}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MOBILE NAVBAR ================= */}
      <div className="md:hidden bg-zinc-900 text-white border-b border-zinc-800 sticky top-0 z-40">
  <div className="flex items-center gap-4 px-3 py-2">
    
    <MobileItem to="/dashboard/profile" icon={<User size={18} />} label="Profile" />
    <MobileItem to="/dashboard/createBlogs" icon={<PenSquare size={18} />} label="Create" />
    <MobileItem to="/dashboard/userBlogs" icon={<FileText size={18} />} label="Blogs" />

    <button
      className="flex items-center gap-1 text-red-400"
      onClick={Logout}
    >
      <LogOut size={18} />
      <span className="text-xs">Logout</span>
    </button>

  </div>
</div>
    </>
  );
}

/* ================= DESKTOP ITEM ================= */
function SidebarItem({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 transition-all"
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

/* ================= MOBILE ITEM ================= */
function MobileItem({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-1 text-xs whitespace-nowrap"
    >
      {icon}
      {label}
    </Link>
  );
}


