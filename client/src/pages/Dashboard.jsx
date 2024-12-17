import React from "react";
import Heading from '../components/Heading'
import Subheading from "../components/Subheading";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow p-4 flex justify-between items-center">
        <Heading label={"Define Payments"}/>
        <div className="flex items-center space-x-2">
          <span className="text-gray-300">Hello, User</span>
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center font-bold">
            U
          </div>
        </div>
      </header>

      {/* Balance Section */}
      <main className="max-w-4xl mx-auto p-4">
        <div className="bg-gray-800 shadow p-6 rounded-md mb-6">
          <h2 className="text-lg font-semibold text-white">Your Balance</h2>
          <p className="text-2xl font-bold text-green-400">$5000</p>
        </div>

        {/* Users Section */}
        <div className="bg-gray-800 shadow p-6 rounded-md">
          <Heading label={"Users"} />

          {/* Search Box */}
          <input
            type="text"
            placeholder="Search users..."
            className="w-full mb-4 p-2 border border-gray-600 bg-gray-700 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* User List */}
          <ul className="space-y-4">
            {["User 1", "User 2", "User 3"].map((user, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-700 p-4 rounded-md shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center font-bold text-white">
                    U{index + 1}
                  </div>
                  <span className="font-medium text-white">{user}</span>
                </div>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                  Send Money
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
