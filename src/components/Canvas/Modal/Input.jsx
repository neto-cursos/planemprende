import React from "react";
import PropTypes from "prop-types";

const Input = ({ className, innerRef, disabled, onChange, name, type }) => {
  return (
    <input
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
      ref={innerRef}
      type={type}
      name={name}
      onChnage={onChange}
      disabled={disabled}
    />
  );
};

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  innerRef: PropTypes.object,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

Input.defaultProps = {
  className: "",
  name: "name",
  type: "text",
  innerRef: {},
  disabled: false,
  onChange: () => null
};

export default Input;
