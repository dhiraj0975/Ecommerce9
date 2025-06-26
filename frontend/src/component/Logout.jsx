import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../api/allAPI"; // ✅ import from API file



const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    
    try {
     
      await logoutAdmin(); // ✅ Call logout API from file
       
      navigate("/login");  // Redirect after logout
    } catch (err) {
     
      console.error("Logout failed", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default Logout;
