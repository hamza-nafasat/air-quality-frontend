// eslint-disable-next-line react/prop-types
const AccordionEditIcon = ({color}) => {
    return (
      <svg
        width="17"
        height="19"
        viewBox="0 0 17 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.32 3.67578H2C0.895 3.67578 0 4.62478 0 5.79378V16.3818C0 17.5518 0.895 18.4998 2 18.4998H13C14.105 18.4998 15 17.5518 15 16.3818V8.63178L11.086 12.7758C10.7442 13.1413 10.2991 13.3938 9.81 13.4998L7.129 14.0678C5.379 14.4378 3.837 12.8048 4.187 10.9528L4.723 8.11378C4.82 7.60178 5.058 7.13078 5.407 6.76178L8.32 3.67578Z"
          fill={color ? color : "#ffffff"}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.8457 1.81704C16.7446 1.56107 16.5964 1.32634 16.4087 1.12504C16.2242 0.928171 16.0017 0.770677 15.7547 0.662042C15.5114 0.555178 15.2485 0.5 14.9827 0.5C14.7169 0.5 14.454 0.555178 14.2107 0.662042C13.9637 0.770677 13.7412 0.928171 13.5567 1.12504L13.0107 1.70304L15.8627 4.72304L16.4087 4.14404C16.5983 3.94427 16.7468 3.70914 16.8457 3.45204C17.0517 2.92651 17.0517 2.34257 16.8457 1.81704ZM14.4497 6.22004L11.5967 3.19904L6.8197 8.25904C6.74922 8.33414 6.70169 8.42782 6.6827 8.52904L6.1467 11.369C6.0767 11.739 6.3857 12.065 6.7347 11.991L9.4167 11.424C9.51429 11.4023 9.60311 11.3518 9.6717 11.279L14.4497 6.22004Z"
          fill={color ? color : "#ffffff"}
        />
      </svg>
    );
  };
  
  export default AccordionEditIcon;
  