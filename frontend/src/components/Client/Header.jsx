import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../features/sidebar/sidebarSlice";
import Logo from "../../assets/Logo.png";
import API_BASE_URL from "../../config/api";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = localStorage.getItem("name") || "User";
  const profilePic = localStorage.getItem("profilepic");
  const avatarUrl = profilePic
    ? `${API_BASE_URL}${profilePic}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
      )}&background=ebe6e7&color=99a1af`;

  return (
    <header className="w-full fixed top-0 z-50 bg-white shadow-sm px-4 py-3 flex items-center justify-between md:px-6">
      {/* Left - Logo */}
      <div
        className="flex items-center gap-2 font-bold text-lg text-gray-800 cursor-pointer"
        onClick={() => dispatch(toggleSidebar())}
      >
        <img src={Logo} alt="" className="w-12 h-12 object-cover " />

        <span>Byway</span>
      </div>

      {/* Right - Icons */}
      <div className="flex items-center gap-3 md:gap-4">
        <button className="text-sm text-gray-600 hover:text-black transition hidden sm:block">
          Teach on Byway
        </button>

        <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer">
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
