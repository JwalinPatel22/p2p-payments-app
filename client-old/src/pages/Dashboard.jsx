// import React from "react";
// import Heading from "../components/Heading";
// import Subheading from "../components/Subheading";

// function Dashboard() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">
//       {/* Header */}
//       <header className="bg-gray-800 shadow p-4 flex justify-between items-center">
//         <Heading label={"Define Payments"} />
//         <div className="flex items-center space-x-2">
//           <span className="text-gray-300">Hello, User</span>
//           <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center font-bold">
//             U
//           </div>
//         </div>
//       </header>

//       {/* Balance Section */}
//       <main className="max-w-4xl mx-auto p-4">
//         <div className="bg-gray-800 shadow p-6 rounded-md mb-6">
//           <h2 className="text-lg font-semibold text-white">Your Balance</h2>
//           <p className="text-2xl font-bold text-green-400">$5000</p>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Install this package using `npm install jwt-decode`
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";

function Dashboard() {
  const [userData, setUserData] = useState({ name: "", balance: 0 });
  const [transactions, setTransactions] = useState([]);

  // Decode JWT Token and fetch user details
  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve JWT token from local storage
    if (token) {
      console.log(token);
      try {
        const decodedToken = jwtDecode(token); // Decode the JWT token
        setUserData({
          name: decodedToken.name,
          balance: decodedToken.balance,
        });
      } catch (error) {
        console.error("Invalid JWT Token:", error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow p-4 flex justify-between items-center">
        <Heading label={"DeFinE Dashboard"} />
        <div className="flex items-center space-x-2">
          <span className="text-gray-300">
            Hello, {userData.fristName || "User"}
          </span>
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center font-bold">
            {userData.name ? userData.firstName : "U"}
          </div>
        </div>
      </header>

      {/* Balance Section */}
      <main className="max-w-4xl mx-auto p-4">
        <div className="bg-gray-800 shadow p-6 rounded-md mb-6">
          <h2 className="text-lg font-semibold text-white">Your Balance</h2>
          <p className="text-2xl font-bold text-green-400">
            ₹{userData.balance || "0"}
          </p>
        </div>

        {/* Previous Transactions */}
        <div className="bg-gray-800 shadow p-6 rounded-md">
          <h2 className="text-lg font-semibold text-white">
            Previous Transactions
          </h2>
          <div className="mt-4">
            {transactions.length > 0 ? (
              <ul className="space-y-3">
                {transactions.map((transaction, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-700 rounded"
                  >
                    <span>{transaction.description}</span>
                    <span
                      className={`font-bold ${
                        transaction.amount > 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}₹{transaction.amount}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No transactions available.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
