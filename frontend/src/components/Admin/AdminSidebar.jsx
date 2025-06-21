import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiBookOpen,
  FiPlus,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Logo from "../../assets/Logo.png"

const menuItems = [
  { label: "Dashboard", icon: <FiHome />, route: "/admin", exact: true },
  { label: "Courses", icon: <FiBookOpen />, route: "/admin/courses" },
  { label: "Add Course", icon: <FiPlus />, route: "/admin/addcourse" },
  { label: "Logout", icon: <FiLogOut />, route: "/logout" },
];

const AdminSidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Get user name from localStorage
  const fullName = localStorage.getItem("name") || "User";
  const nameParts = fullName.trim().split(" ");

  // Get first and last letter of name
  let initials = "U";
  if (nameParts.length === 1) {
    const word = nameParts[0];
    initials = word.length >= 2 ? (word[0] + word[word.length - 1]).toUpperCase() : word[0].toUpperCase();
  } else if (nameParts.length > 1) {
    initials = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
  }

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="text-white bg-gray-900 p-2 rounded-full shadow-lg"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-gray-900 text-white flex flex-col justify-between p-6 shadow-lg z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={Logo} alt="logo" className="w-12 h-12"/>
          <h1 className="text-lg font-semibold">Byway</h1>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-3 mt-6 flex-grow">
          {menuItems.map((item, index) => {
            const isActive = item.exact
              ? location.pathname === item.route
              : location.pathname.startsWith(item.route);
            return (
              <Link
                to={item.route}
                key={index}
                className={`flex items-center gap-3 px-4 py-3 hover:text-blue-500 hover:border-l-2 hover:border-blue-500 transition-all ${
                  isActive
                    ? "text-blue-500 border-l-2 border-blue-500 bg-gray-800"
                    : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Profile */}
        <div className="flex gap-2 items-center mt-6">
          
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-semibold">
              {initials}
            </div>
          
          <span>Hi, {nameParts[0]}</span>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
