import React from "react";
import axios from "axios";

export default function Home() {

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/auth/logout", {}, {
        withCredentials: true, 
      });
      alert("Logged out successfully.");
      
      window.location.href = "/"; 
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white text-2xl p-2 rounded-md cursor-pointer hover:bg-red-700 duration-200"
      >
        Logout
      </button>
    </div>
  );
}
