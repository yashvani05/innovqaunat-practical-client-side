import axiosInstance from "../lib/axiosInstance";
import { ChevronFirst, ChevronLast, LogOut } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const SidebarContext = createContext();
export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/user/logout", {
        headers: { "Content-Type": "application/json" },
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <aside
      className={`h-screen border-r transition-all ${
        expanded ? "w-52" : "w-16"
      }`}
    >
      <nav className="h-full flex flex-col bg-white shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <i
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
          >
            <div className="flex items-center font-bold text-[15px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
              TECH YASH
            </div>
          </i>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex items-center p-3">
          <div className="w-10 h-10 rounded-md flex items-center justify-center bg-blue-500 text-white font-bold">
            {user.firstName[0].toUpperCase()}
            {user.lastName[0].toUpperCase()}
          </div>
          {expanded && (
            <div className="flex-1 ml-3">
              <h4 className="font-semibold">
                {user.firstName.toUpperCase()} {user.lastName.toUpperCase()}
              </h4>
              <span className="text-xs text-gray-600">{user.email}</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="p-2 ml-auto rounded-md bg-gray-50 hover:bg-gray-100"
            title="Logout"
          >
            <LogOut className="text-gray-600" size={20} />
          </button>
        </div>
      </nav>
    </aside>
  );
}
