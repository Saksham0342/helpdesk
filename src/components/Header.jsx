import { useState, useRef, useEffect } from "react";
import { Bell, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const user = auth.currentUser;

  return (
    <header className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-700">
        Welcome, {user?.displayName || "User"} 👋
      </h1>

      <div className="relative flex items-center space-x-4" ref={dropdownRef}>
        <Bell className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-600" />

        <div className="relative">
          <UserCircle
            className="w-7 h-7 text-gray-600 cursor-pointer"
            onClick={toggleDropdown}
          />

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-10">
              <button
                onClick={handleProfile}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                👤 Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
