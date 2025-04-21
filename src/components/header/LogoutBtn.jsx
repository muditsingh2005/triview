import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { LogOut } from "lucide-react";

function LogoutBtn({ className = "" }) {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center text-gray-700 hover:bg-gray-100 transition-colors ${className}`}
      onClick={logoutHandler}
    >
      <LogOut className="h-4 w-4 mr-1" />
      Logout
    </button>
  );
}

export default LogoutBtn;
