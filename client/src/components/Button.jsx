import React from "react";

const Button = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
    >
      {label}
    </button>
  );
};

export default Button;
