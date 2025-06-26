// 📁 src/components/Sidebar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ useNavigate import kiya

import {
  FaTachometerAlt,
  FaUsers,
  FaUserShield,
  FaUserTag,
  FaUserCheck,
  FaStore,
  FaStoreAlt,
  FaBoxOpen,
  FaThList,
  FaThLarge,
  FaCogs,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

import logo from "../assets/image.png";
import { logoutAdmin } from "../api";

function Sidebar() {
  const [openSection, setOpenSection] = useState(null);
  const navigate = useNavigate(); // ✅ yeh add karo

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin(); // ✅ API call
      navigate("/login");  // ✅ Redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-64 bg-white text-black h-screen p-4 space-y-4 relative shadow-2xl">
      {/* Logo */}
      <div className="mb-4 ">
        <Link to="/"><img src={logo} alt="Admin Panel Logo" className="w-34 h-auto " /></Link>
      </div>

      <nav className="space-y-2">
        {/* Dashboard */}
        <Link to="/" className="flex items-center space-x-2 hover:bg-blue-600 hover:text-white p-2 rounded">
          <FaTachometerAlt />
          <span>Dashboard</span>
        </Link>

        {/* Admin Management */}
        <div>
          <button onClick={() => toggleSection("admin")} className="flex w-full items-center justify-between hover:bg-blue-600 hover:text-white p-2 rounded">
            <span className="flex items-center space-x-2">
              <FaUsers />
              <span>Admin Management</span>
            </span>
            {openSection === "admin" ? <FaChevronDown /> : <FaChevronRight />}
          </button>
          {openSection === "admin" && (
            <div className="ml-6 space-y-1">
              <Link to="/admin/users" className="block hover:bg-blue-600 hover:text-white p-2 rounded">🙍‍♂️ Users</Link>
              <Link to="/roles" className="block hover:bg-blue-600 hover:text-white p-2 rounded">🛡️ Roles</Link>
            </div>
          )}
        </div>

             {/* Retailer Management */}
        <div>
          <button onClick={() => toggleSection("retailers")} className="flex w-full items-center justify-between hover:bg-blue-600 hover:text-white p-2 rounded">
            <span className="flex items-center space-x-2">
              <FaStoreAlt />
              <span>Retailer Management</span>
            </span>
            {openSection === "retailers" ? <FaChevronDown /> : <FaChevronRight />}
          </button>
          {openSection === "retailers" && (
            <div className="ml-6 space-y-1">
              <Link to="/retailers" className="block hover:bg-blue-600 hover:text-white p-2 rounded">🏪 Retailer</Link>
              <Link to="/retailer-bank" className="block hover:bg-blue-600 hover:text-white p-2 rounded">🏦 Bank Account</Link>
            </div>
          )}
        </div>

        {/* Product Management */}
        <div className="flex flex-col gap-3">
          <button onClick={() => toggleSection("products")} className="flex w-full items-center justify-between hover:bg-blue-600 hover:text-white p-2 rounded">
            <span className="flex items-center space-x-2">
              <FaBoxOpen />
              <span>Product Management</span>
            </span>
            {openSection === "products" ? <FaChevronDown /> : <FaChevronRight />}
          </button>
          {openSection === "products" && (
            <div className="ml-6 space-y-1">
              <Link to="/categories" className="block hover:bg-blue-600 hover:text-white p-2 rounded">🧩 Categories</Link>
              <Link to="/subcategories" className="block hover:bg-blue-600 hover:text-white p-2 rounded">🗃️ Sub-Categories</Link>
              <Link to="/products" className="block hover:bg-blue-600 hover:text-white p-2 rounded">🛍️ Products</Link>
            </div>
          )}
        </div>

        {/* Settings & Logout */}
        <Link to="/settings" className="flex items-center space-x-2 hover:text-white hover:bg-blue-600 p-2 rounded">
          <FaCogs />
          <span>Settings</span>
        </Link>

        <button onClick={handleLogout} className="flex w-full items-center space-x-2 hover:text-white hover:bg-blue-600 p-2 rounded">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </nav>

      <div className="absolute bottom-4 text-sm text-gray-400">Logged in as: Admin</div>
    </div>
  );
}

export default Sidebar;
