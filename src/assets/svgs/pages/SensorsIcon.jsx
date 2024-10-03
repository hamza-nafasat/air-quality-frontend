import React from "react";

const SensorsIcon = ({activeLink}) => {
  const isActive = activeLink ? '#fff':'rgba(132, 145, 165, 1)';
  return (
    <>
      <svg
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.59266 6.75481V9.93504H7.63831V6.75481C7.79012 6.79543 7.95048 6.81753 8.11513 6.81753C8.28048 6.81753 8.44085 6.79614 8.59266 6.75481ZM0.197419 15.5H16.0335C16.1418 15.5 16.2309 15.4116 16.2309 15.3026V14.4159C16.2309 14.3076 16.1425 14.2185 16.0335 14.2185L0.197419 14.2192C0.0890849 14.2192 0 14.3076 0 14.4167V15.3033C0.000712862 15.4116 0.0890904 15.5 0.197419 15.5ZM3.41396 0.576974C3.5166 0.474342 3.68267 0.474342 3.7853 0.576974C3.88793 0.679607 3.88793 0.845679 3.7853 0.948312C2.67202 2.0616 2.1154 3.5206 2.1154 4.98026C2.1154 6.43921 2.67204 7.89885 3.7853 9.01221C3.88793 9.11484 3.88793 9.28091 3.7853 9.38355C3.68267 9.48618 3.5166 9.48618 3.41396 9.38355C2.19805 8.16763 1.5901 6.57406 1.5901 4.9803C1.58939 3.38664 2.19734 1.79287 3.41396 0.576974ZM12.4463 0.948312C12.3437 0.845679 12.3437 0.679607 12.4463 0.576974C12.549 0.474342 12.7151 0.474342 12.8177 0.576974C14.0336 1.79289 14.6415 3.38646 14.6415 4.98022C14.6415 6.57399 14.0336 8.16757 12.8177 9.38347C12.7151 9.4861 12.549 9.4861 12.4463 9.38347C12.3437 9.28084 12.3437 9.11477 12.4463 9.01213C13.5596 7.89885 14.1163 6.43912 14.1163 4.98019C14.1163 3.52124 13.5596 2.06167 12.4463 0.948312ZM10.197 3.19765C10.0944 3.09502 10.0944 2.92894 10.197 2.82631C10.2996 2.72368 10.4657 2.72368 10.5683 2.82631C11.1635 3.42143 11.4607 4.20044 11.4607 4.98022C11.4607 5.75994 11.1635 6.53967 10.5683 7.13414C10.4657 7.23677 10.2996 7.23677 10.197 7.13414C10.0944 7.0315 10.0944 6.86543 10.197 6.7628C10.6895 6.27031 10.9354 5.62528 10.9354 4.98028C10.9354 4.33525 10.6888 3.69014 10.197 3.19765ZM11.3217 2.07296C12.1242 2.87548 12.5255 3.92819 12.5255 4.98024C12.5255 6.03229 12.1242 7.08489 11.3217 7.88752C11.2191 7.99015 11.2191 8.15623 11.3217 8.25886C11.4243 8.36149 11.5904 8.36149 11.693 8.25886C12.5982 7.3537 13.0515 6.16698 13.0515 4.98028C13.0515 3.79359 12.5989 2.60687 11.693 1.7017C11.5904 1.59907 11.4243 1.59907 11.3217 1.7017C11.2191 1.80433 11.2191 1.97033 11.3217 2.07296ZM5.66332 2.82631C5.76595 2.72368 5.93202 2.72368 6.03466 2.82631C6.13729 2.92894 6.13729 3.09502 6.03466 3.19765C5.54288 3.69014 5.29627 4.33516 5.29627 4.98017C5.29627 5.62519 5.54217 6.2702 6.03466 6.76269C6.13729 6.86532 6.13729 7.03139 6.03466 7.13403C5.93202 7.23666 5.76595 7.23666 5.66332 7.13403C5.0682 6.5389 4.77099 5.7599 4.77099 4.98011C4.77099 4.2004 5.0682 3.42078 5.66332 2.82631ZM4.53863 1.70162C3.63348 2.60678 3.18018 3.7935 3.18018 4.98021C3.18018 6.16689 3.63277 7.35361 4.53863 8.25879C4.64126 8.36142 4.80734 8.36142 4.90997 8.25879C5.0126 8.15615 5.0126 7.99008 4.90997 7.88745C4.10745 7.08493 3.70546 6.03222 3.70546 4.98017C3.70546 3.92812 4.10672 2.87552 4.90997 2.07289C5.0126 1.97026 5.0126 1.80418 4.90997 1.70155C4.80734 1.59892 4.64126 1.59899 4.53863 1.70162ZM8.11571 3.66797C8.84056 3.66797 9.42784 4.25526 9.42784 4.9801C9.42784 5.70494 8.84054 6.29222 8.11571 6.29222C7.39158 6.29222 6.80359 5.70493 6.80359 4.9801C6.80359 4.25596 7.39088 3.66797 8.11571 3.66797ZM12.4412 13.6938V11.4523C12.4412 10.9071 11.9951 10.4602 11.4491 10.4602L4.7823 10.4609C4.23707 10.4609 3.79019 10.9071 3.79019 11.4531V13.6938L12.4412 13.6938ZM6.2426 11.4994H9.98864C10.097 11.4994 10.1861 11.5878 10.1861 11.6968V12.458C10.1861 12.5664 10.0977 12.6554 9.98864 12.6554L6.2426 12.6547C6.13427 12.6547 6.04519 12.5664 6.04519 12.4573V11.6961C6.04519 11.5878 6.13428 11.4994 6.2426 11.4994Z"
          fill={isActive}
        />
      </svg>
    </>
  );
};

export default SensorsIcon;
