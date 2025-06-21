import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaBookOpen, FaTachometerAlt } from "react-icons/fa";
import API_BASE_URL from "../../config/api";
import Logo from "../../assets/Logo.png"

const VideoHeader = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const name = localStorage.getItem("name") || "User";
  const profilePic = localStorage.getItem("profilepic");
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=222831&color=eeeeee`;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/logout");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#1f1f2e] text-white shadow-md px-4 py-3 flex items-center justify-between md:px-8 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white">
         <img src={Logo} alt="" className="w-12 h-12 object-cover " />
        <span className="tracking-wide">ByWay</span>
      </Link>

      {/* Avatar + Dropdown */}
      <div className="relative">
        <div
          onClick={toggleMenu}
          className="cursor-pointer w-10 h-10 rounded-full border-2 border-pink-500 hover:ring-2 ring-pink-400 transition"
        >
          <img
            src={profilePic ? `${API_BASE_URL}${profilePic}` : avatarUrl}
            alt="User"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {menuOpen && (
          <div className="absolute right-0 mt-3 w-52 bg-[#2c2c3e] rounded-md shadow-xl border border-[#3d3d5c] overflow-hidden z-50">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-2 hover:bg-[#3b3b4e] transition text-sm text-gray-200"
            >
              <FaBookOpen className="text-yellow-300" />
              My Courses
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#3b3b4e] transition text-sm text-red-400"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default VideoHeader;
