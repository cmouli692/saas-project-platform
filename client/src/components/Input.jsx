import React from "react";

const Input = ({ type, name, value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-black"
    />
  );
};

export default Input;
