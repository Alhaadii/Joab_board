import React from "react";
import { Link } from "react-router-dom";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../utils/localStorage";
const Nav = () => {
  return (
    <div className="bg-green-950">
      <nav className="flex flex-row justify-between items-center max-w-[1420px] mx-auto">
        <Link to="/">
          <h1 className="text-white text-2xl">JOB BOARD</h1>
        </Link>

        <ul className="flex justify-between p-4 space-x-4 text-xl">
          {getFromLocalStorage("UserInfo") ? (
            <div className="flex justify-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-xl font-bold">
                  {getFromLocalStorage("UserInfo")
                    .name.split(" ")[0][0]
                    .toUpperCase()}
                </span>
              </div>
              <li className="text-white">
                <Link
                  to="/login"
                  onClick={() => removeFromLocalStorage("UserInfo")}
                >
                  Logout
                </Link>
              </li>
            </div>
          ) : (
            <div className="flex justify-center space-x-4">
              <li className="text-white">
                <Link to="/register">Register</Link>
              </li>
              <li className="text-white">
                <Link to="/login">login</Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
