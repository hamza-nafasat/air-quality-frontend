import React from "react";

const HomeIcon = ({activeLink}) => {
  const isActive = activeLink ? '#fff':'rgba(132, 145, 165, 1)';
  return (
    <>
      <svg
        width="18"
        height="17"
        viewBox="0 0 18 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.97618 1.23975C8.5404 0.800902 9.31636 0.773473 9.90705 1.15747L10.0226 1.23975L17.0091 6.67367C17.6105 7.14149 17.3175 8.08349 16.5937 8.16118L16.4969 8.1663H15.6661V14.833C15.6661 15.7116 14.9861 16.4314 14.1238 16.4951L13.9994 16.4996H3.99939C3.12076 16.4996 2.40092 15.8198 2.3373 14.9574L2.33272 14.833V8.1663H1.50182C0.740684 8.1663 0.392244 7.24332 0.916344 6.73721L0.989691 6.67367L7.97618 1.23975ZM8.99943 2.55534L3.68723 6.68702C3.87767 6.84134 3.99939 7.07711 3.99939 7.3413V14.833H6.49939V10.6663C6.49939 9.28555 7.61868 8.1663 8.99943 8.1663C10.3801 8.1663 11.4994 9.28555 11.4994 10.6663V14.833H13.9994V7.3413C13.9994 7.0771 14.1211 6.84133 14.3115 6.68702L8.99943 2.55534ZM8.99943 9.83297C8.53918 9.83297 8.1661 10.2061 8.1661 10.6663V14.833H9.83277V10.6663C9.83277 10.2061 9.4596 9.83297 8.99943 9.83297Z"
          fill={isActive}
        />
      </svg>
    </>
  );
};

export default HomeIcon;