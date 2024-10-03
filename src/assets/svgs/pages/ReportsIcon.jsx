import React from "react";

const ReportsIcon = ({activeLink}) => {
  const isActive = activeLink ? '#fff':'rgba(132, 145, 165, 1)';
  return (
    <>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.6673 1.66602H5.00065C4.55862 1.66602 4.1347 1.84161 3.82214 2.15417C3.50958 2.46673 3.33398 2.89065 3.33398 3.33268V16.666C3.33398 17.108 3.50958 17.532 3.82214 17.8445C4.1347 18.1571 4.55862 18.3327 5.00065 18.3327H15.0007C15.4427 18.3327 15.8666 18.1571 16.1792 17.8445C16.4917 17.532 16.6673 17.108 16.6673 16.666V6.66602L11.6673 1.66602Z"
          stroke={isActive}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.666 1.66602V6.66602H16.666"
          stroke={isActive}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.3327 10.834H6.66602"
          stroke={isActive}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.3327 14.166H6.66602"
          stroke={isActive}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.33268 7.5H7.49935H6.66602"
          stroke={isActive}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export default ReportsIcon;
