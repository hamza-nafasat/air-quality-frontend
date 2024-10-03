import React from "react";

const AlertIcon = ({ color }) => {
  return (
    <svg
      width="8"
      height="36"
      viewBox="0 0 8 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="0.5" width="8" height="8" rx="4" fill={color} />
      <path
        d="M4 8.5V34.5"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default AlertIcon;
