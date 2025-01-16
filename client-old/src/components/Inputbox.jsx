import React from "react";

const Inputbox = ({ label, placeholder, onChange, type="text" }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={onChange}
        required
      />
    </div>
  );
};

export default Inputbox;
