import React from "react";

const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} z-[99] right-0 custom-arrow`}
      onClick={onClick}
    >
      <svg
        width="19"
        height="25"
        viewBox="0 0 19 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.0484 11.8926L1.08369 24.0749L8.8935 12.0474L0.682183 0.289762L18.0484 11.8926Z"
          fill="#060606"
          fillOpacity="0.8"
        />
      </svg>
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} left-0 z-[99] custom-arrow`}
      onClick={onClick}
    >
      <svg
        width="18"
        height="25"
        viewBox="0 0 18 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.451591 11.8926L17.4163 24.0749L9.6065 12.0474L17.8178 0.289762L0.451591 11.8926Z"
          fill="#060606"
          fillOpacity="0.8"
        />
      </svg>
    </div>
  );
};

export { NextArrow, PrevArrow };
