/* eslint-disable react/prop-types */

const AlertIcon = ({ color }) => {
  return (
    <div className="flex flex-col items-center mt-3 self-stretch">
      {/* Top Circle */}
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />

      {/* Vertical Line — always visible */}
      <div className="flex-1 w-[2px] my-1 min-h-[20px]" style={{ backgroundColor: color }} />

      {/* Bottom Circle */}
      {/* <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} /> */}
    </div>
  );
};

export default AlertIcon;
