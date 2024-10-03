import React from "react";

const OccupancyIcon = () => {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_b_655_9500)">
        <circle cx="19" cy="19" r="19" fill="#03A5E0" />
      </g>
      <path
        d="M18 9V29C12.9 28.5 9 24.2 9 19C9 13.8 12.9 9.5 18 9ZM20 9V18H29C28.5 13.2 24.8 9.5 20 9ZM20 20V29C24.7 28.5 28.5 24.8 29 20H20Z"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_b_655_9500"
          x="-11"
          y="-11"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="5.5" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_655_9500" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_655_9500" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export default OccupancyIcon;
