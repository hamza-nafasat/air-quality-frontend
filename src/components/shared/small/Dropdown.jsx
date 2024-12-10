/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import ChevronIcon from "../../../assets/svgs/buildings/ChevronIcon";

const Dropdown = ({ label, options, defaultText = "Select", onSelect, icon, height, overflow, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  const selectHandler = (option) => {
    setSelected(option.option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className={`flex flex-col gap-2 w-full ${disabled && "pointer-events-none opacity-50"} `}>
      {label && <label className="text-sm md:text-base font-[600]">{label}</label>}
      <div className="relative w-full" ref={dropdownRef}>
        <button
          type="button"
          className={`w-full bg-white border border-primary-lightGray flex items-center justify-between rounded-[12px] h-[50px] md:h-[55px] p-4 text-sm md:text-base 
          ${selected || defaultText !== "Select" ? "text-black" : "text-[#11111199]"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            {icon && icon}
            <span className="text-sm">{selected || defaultText}</span>
          </div>
          <div className={`transition-all duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
            <ChevronIcon />
          </div>
        </button>
        {isOpen && (
          <ul
            className={`absolute z-10 w-full ${height ? `h-[${height}]` : "h-auto"} 
            ${overflow ? `overflow-${overflow}` : "overflow-hidden"}
            rounded-md shadow-md cursor-pointer border-y mt-1`}
          >
            {options?.map((option, i) => (
              <li
                className="py-2 px-4 border-b  bg-white hover:bg-[hsl(208,100%,95%)]"
                key={i}
                onClick={() => selectHandler(option)}
              >
                {option.option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
