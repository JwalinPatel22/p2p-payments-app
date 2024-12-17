import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-gray-800 shadow-md">
      <div className="flex items-center">
        <ul className="flex items-center space-x-6">
          <li>
            <NavLink
              to="/"
              className="text-gray-300 hover:text-white transition duration-300"
              activeClassName="text-blue-400"
            >
              <AiFillHome className="mr-2" size={20} />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className="text-gray-300 hover:text-white transition duration-300"
              activeClassName="text-blue-400"
            >
              <MdDashboard className="mr-2" size={20} />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signin"
              className="text-gray-300 hover:text-white transition duration-300"
              activeClassName="text-blue-400"
            >
              <FaSignInAlt className="mr-2" size={20} />
              Signin
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className="text-gray-300 hover:text-white transition duration-300"
              activeClassName="text-blue-400"
            >
              <FaUserPlus className="mr-2" size={20} />
              Signup
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/send"
              className="text-gray-300 hover:text-white transition duration-300"
              activeClassName="text-blue-400"
            >
              <FaPaperPlane className="mr-2" size={20} />
              Send
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
