/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import ChevronIcon from '../../../assets/svgs/buildings/ChevronIcon';

const MultipleSelector = ({
  label,
  options,
  defaultText = 'Select',
  onSelect,
  icon,
  height,
  overflow,
  disabled = false,
  value = [], // ✅ new
}) => {
  // console.log('onSelect');

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]); // multiple selected
  const dropdownRef = useRef(null);

  const toggleOption = (option) => {
    const alreadySelected = selected.some((item) => item._id === option._id);

    const newSelected = alreadySelected
      ? selected.filter((item) => item._id !== option._id)
      : [...selected, option];

    setSelected(newSelected);
    if (onSelect) onSelect(newSelected);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isOptionSelected = (option) => selected.some((item) => item._id === option._id);
  useEffect(() => {
    setSelected(value);
  }, [value]);
  return (
    <div className={`flex flex-col gap-1 w-full ${disabled && 'pointer-events-none opacity-50'}`}>
      {label && <label className="text-sm md:text-base font-[600]">{label}</label>}
      <div className="relative w-full" ref={dropdownRef}>
        <button
          type="button"
          className={`w-full bg-white border border-primary-lightGray flex items-center justify-between rounded-[12px] h-[45px] md:h-[52px] p-4 text-sm md:text-base
          ${selected.length ? 'text-black' : 'text-[#11111199]'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2 flex-wrap text-left">
            {icon && icon}
            <span className="text-sm truncate">
              {selected.length ? selected.map((item) => item.name).join(', ') : defaultText}
            </span>
          </div>
          <div className={`transition-all duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            <ChevronIcon />
          </div>
        </button>

        {isOpen && (
          <ul
            className={`absolute z-10 w-full bg-white border-y mt-1 rounded-md shadow-md cursor-pointer
              ${height ? `h-[${height}]` : 'max-h-60'}
              ${overflow ? `overflow-${overflow}` : 'overflow-y-auto'}`}
          >
            {options?.map((option, i) => (
              <li
                key={i}
                onClick={() => toggleOption(option)}
                className={`py-2 px-4 border-b hover:bg-[hsl(208,100%,95%)]
                ${isOptionSelected(option) ? 'bg-[hsl(208,100%,90%)] font-semibold' : ''}`}
              >
                {option.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MultipleSelector;

// /* eslint-disable react/prop-types */
// import { useEffect, useRef, useState } from 'react';
// import ChevronIcon from '../../../assets/svgs/buildings/ChevronIcon';

// const MultipleSelector = ({
//   label,
//   options,
//   value = [], // external selected list
//   defaultText = 'Select',
//   onSelect,
//   icon,
//   height,
//   overflow,
//   disabled = false,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selected, setSelected] = useState([]);
//   const dropdownRef = useRef(null);

//   // Sync external value with internal selected state
//   useEffect(() => {
//     if (value && Array.isArray(value)) {
//       setSelected(value);
//     }
//   }, [value]);

//   const toggleOption = (option) => {
//     const alreadySelected = selected.some((item) => item._id === option._id);

//     const newSelected = alreadySelected
//       ? selected.filter((item) => item._id !== option._id)
//       : [...selected, option];

//     setSelected(newSelected);
//     if (onSelect) onSelect(newSelected);
//   };

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const isOptionSelected = (option) => selected.some((item) => item._id === option._id);

//   return (
//     <div className={`flex flex-col gap-1 w-full ${disabled && 'pointer-events-none opacity-50'}`}>
//       {label && <label className="text-sm md:text-base font-[600]">{label}</label>}
//       <div className="relative w-full" ref={dropdownRef}>
//         <button
//           type="button"
//           className={`w-full bg-white border border-primary-lightGray flex items-center justify-between rounded-[12px] h-[45px] md:h-[52px] p-4 text-sm md:text-base
//           ${selected.length ? 'text-black' : 'text-[#11111199]'}`}
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <div className="flex items-center gap-2 flex-wrap text-left">
//             {icon && icon}
//             <span className="text-sm truncate">
//               {selected.length ? selected.map((item) => item.name).join(', ') : defaultText}
//             </span>
//           </div>
//           <div className={`transition-all duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
//             <ChevronIcon />
//           </div>
//         </button>

//         {isOpen && (
//           <ul
//             className={`absolute z-10 w-full bg-white border-y mt-1 rounded-md shadow-md cursor-pointer
//               ${height ? `h-[${height}]` : 'max-h-60'}
//               ${overflow ? `overflow-${overflow}` : 'overflow-y-auto'}`}
//           >
//             {options?.map((option, i) => {
//               const selectedItem = isOptionSelected(option);
//               return (
//                 <li
//                   key={i}
//                   onClick={() => toggleOption(option)}
//                   className={`py-2 px-4 border-b hover:bg-[hsl(208,100%,95%)]
//                     ${selectedItem ? 'bg-[hsl(208,100%,90%)] font-semibold' : ''}`}
//                 >
//                   {option.name}
//                 </li>
//               );
//             })}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MultipleSelector;

/* eslint-disable react/prop-types */
// import { useEffect, useRef, useState } from 'react';
// import ChevronIcon from '../../../assets/svgs/buildings/ChevronIcon';

// const MultipleSelector = ({
//   label,
//   options,
//   value = [], // selected items from parent
//   defaultText = 'Select',
//   onSelect,
//   icon,
//   height,
//   overflow,
//   disabled = false,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selected, setSelected] = useState([]);
//   const dropdownRef = useRef(null);

//   // Sync external value to internal state
//   useEffect(() => {
//     if (Array.isArray(value)) {
//       setSelected(value);
//     }
//   }, [value]);

//   const toggleOption = (option) => {
//     const alreadySelected = selected.some((item) => item._id === option._id);

//     const newSelected = alreadySelected
//       ? selected.filter((item) => item._id !== option._id)
//       : [...selected, option];

//     setSelected(newSelected);
//     if (onSelect) onSelect(newSelected);
//   };

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const isOptionSelected = (option) => selected.some((item) => item._id === option._id);

//   return (
//     <div className={`flex flex-col gap-1 w-full ${disabled && 'pointer-events-none opacity-50'}`}>
//       {label && <label className="text-sm md:text-base font-[600]">{label}</label>}
//       <div className="relative w-full" ref={dropdownRef}>
//         <button
//           type="button"
//           className={`w-full bg-white border border-primary-lightGray flex items-center justify-between rounded-[12px] h-[45px] md:h-[52px] p-4 text-sm md:text-base
//           ${selected.length ? 'text-black' : 'text-[#11111199]'}`}
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <div className="flex items-center gap-2 flex-wrap text-left">
//             {icon && icon}
//             <span className="text-sm truncate">
//               {selected.length ? selected.map((item) => item.name).join(', ') : defaultText}
//             </span>
//           </div>
//           <div className={`transition-all duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
//             <ChevronIcon />
//           </div>
//         </button>

//         {isOpen && (
//           <ul
//             className={`absolute z-10 w-full bg-white border-y mt-1 rounded-md shadow-md cursor-pointer
//               ${height ? `h-[${height}]` : 'max-h-60'}
//               ${overflow ? `overflow-${overflow}` : 'overflow-y-auto'}`}
//           >
//             {options?.map((option, i) => (
//               <li
//                 key={i}
//                 onClick={() => toggleOption(option)}
//                 className={`py-2 px-4 border-b hover:bg-[hsl(208,100%,95%)]
//                 ${isOptionSelected(option) ? 'bg-[hsl(208,100%,90%)] font-semibold' : ''}`}
//               >
//                 {option.name}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MultipleSelector;
