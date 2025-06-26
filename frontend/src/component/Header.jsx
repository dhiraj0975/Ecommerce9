// 📁 src/components/Header.jsx
import React from "react";
import LogOutDropdown from "./LogOutDropdown";

function Header() {
  return (
    <header className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* 🔵 Left: Dashboard Title */}
      <h2 className="text-2xl font-semibold text-gray-800">📊 Dashboard</h2>

      {/* 🔵 Right Section */}
      <div className="flex items-center space-x-4">
        {/* 🔍 Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search anything..."
            className="border border-gray-300 focus:border-blue-500 outline-none px-4 py-2 rounded-full w-64 text-sm shadow-sm transition-all duration-200"
          />
          <button className="absolute right-2 top-2 text-gray-500 hover:text-blue-500 text-lg">
            🔍
          </button>
        </div>

        {/* 🔽 Dropdown */}
        <LogOutDropdown />
      </div>
    </header>
  );
}

export default Header;
