import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { closeSidebar } from "../../features/sidebar/sidebarSlice";
import API_BASE_URL from "../../config/api";
import share from "../../assets/Share.svg";
import { FiLogOut } from "react-icons/fi";

const navItems = [
  { label: "Profile", path: "/profile" },
  { label: "My Courses", path: "/dashboard" },
  { label: "Buy Courses", path: "/our-courses" },
  { label: "Logout", type: "logout" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.usersidebar.isOpen);
  const currentPath = window.location.pathname;

  const name = localStorage.getItem("name") || "User";
  const profilepic = localStorage.getItem("profilepic");
  const avatarUrl = profilepic
    ? `${API_BASE_URL}${profilepic}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ebe6e7&color=99a1af`;

  const handleNav = (pathOrType) => {
    if (pathOrType === "logout") {
      dispatch(closeSidebar());
      navigate("/logout");
    } else {
      navigate(pathOrType);
      dispatch(closeSidebar());
    }
  };


  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 p-4 mt-0 md:mt-20 bg-white rounded-xl shadow-md sticky md:top-20 h-fit hidden md:block">
        <SidebarContent
          avatarUrl={avatarUrl}
          currentPath={currentPath}
          onNavigate={handleNav}
          name={name}
        />
      </aside>

      {/* Mobile Slide-over Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => dispatch(closeSidebar())}
        >
          <div
            className="bg-white w-64 h-full p-4 pt-20 shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent
              avatarUrl={avatarUrl}
              currentPath={currentPath}
              onNavigate={handleNav}
              name={name}
            />
          </div>
        </div>
      )}
    </>
  );
};

const SidebarContent = ({ avatarUrl, currentPath, onNavigate, name }) => (
  <>
    {/* Profile Section */}
    <div className="flex flex-col items-center text-center">
      <img
        src={avatarUrl}
        alt="User"
        className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
      />
      <h2 className="mt-4 text-lg font-semibold text-gray-800">{name}</h2>

      <button
        className="mt-2 px-4 py-1.5 flex items-center gap-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
        onClick={() => navigator.share?.({ title: "Check out my profile!", url: window.location.href })}
      >
        Share Profile <img src={share} alt="share" className="w-5 h-5" />
      </button>
    </div>

    <hr className="my-6 border-gray-200" />

    {/* Navigation Items */}
    <ul className="space-y-1 text-sm">
      {navItems.map((item) => (
        <li
          key={item.label}
          onClick={() =>
            onNavigate(item.type === "logout" ? "logout" : item.path)
          }
          className={`px-4 py-2 rounded-md cursor-pointer flex items-center gap-2 transition ${
            currentPath === item.path
              ? "bg-gray-900 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {item.type === "logout" && <FiLogOut />}
          {item.label}
        </li>
      ))}
    </ul>
  </>
);

export default Sidebar;
