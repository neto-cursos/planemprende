import React from "react";

const Button = ({ className, children, disabled, onClick }) => {
  return (
    <button
      className={`rounded-lg ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
