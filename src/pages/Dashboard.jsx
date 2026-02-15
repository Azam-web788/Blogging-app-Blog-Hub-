import Navbar from "../component/Navbar";
import Sidebar from "../component/SideBar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Top Navbar */}
      <Navbar />

      {/* Sidebar + Content */}
      <div className="md:flex">
        <Sidebar />

        <main className="flex-1 p-4 md:p-8 md:ml-64">
          <div className="bg-white rounded-xl shadow p-4 md:p-6 min-h-[60vh]">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
}
