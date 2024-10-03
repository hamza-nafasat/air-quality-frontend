import React from "react";

const LpgIcon = () => {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_b_680_4949)">
        <circle cx="19" cy="19" r="19" fill="#03A5E0" />
      </g>
      <path
        d="M23.3317 17.1507L21.912 14.7172C21.8311 17.3821 21.5903 17.7835 21.2749 17.9886C20.3128 16.5938 19.7596 14.2031 19.6011 11.6512L19.436 9L17.7718 11.0703C13.5422 16.332 11.621 20.6375 12.0617 23.8673C12.33 25.8324 13.4032 26.9745 14.2562 27.5869C15.5801 28.5369 17.1953 29 18.784 29C20.7754 29 22.7253 28.2721 24.0057 26.8631L24.0683 26.7872C25.3202 25.1125 26.2084 22.0815 23.3317 17.1507Z"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_b_680_4949"
          x="-11"
          y="-11"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="5.5" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_680_4949"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_680_4949"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default LpgIcon;
