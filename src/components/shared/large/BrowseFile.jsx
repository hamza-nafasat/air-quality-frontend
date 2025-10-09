/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import ImageIcon from '../../../assets/svgs/stepper/ImageIcon';

const BrowseFile = ({ setFile, file, previewValue, setPreviewValue }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  // 🔹 Handle drag events
  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) handleFileSelect(droppedFile);
  };

  // 🔹 Handle file input change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) handleFileSelect(selectedFile);
  };

  // 🔹 Convert image to base64 and show preview
  const handleFileSelect = (file) => {
    setFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPreviewValue(reader.result);
  };

  // 🔹 Open file selector when div is clicked
  const handleDivClick = () => {
    inputRef.current.click();
  };

  // 🔹 Remove selected image
  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setFile(null);
    setPreviewValue(null);
  };

  return (
    <div
      className={`mt-3 border border-dashed rounded-lg p-4 h-[200px] md:h-[290px] grid place-items-center relative transition-all duration-200 ${
        dragActive
          ? 'border-primary-lightBlue bg-[rgba(200,240,255)]'
          : 'border-primary-lightBlue bg-[rgba(235,250,255)]'
      }`}
      onClick={handleDivClick}
      onDragOver={handleDragOver}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="fileInput"
        ref={inputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      <div className="flex flex-col items-center gap-2 w-full h-full justify-center">
        {previewValue ? (
          <div className="relative w-full md:h-[255px] ">
            <img
              src={previewValue}
              alt="Uploaded preview"
              className="w-full h-full object-contain rounded-lg"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-white text-red-500 px-2 py-1 rounded-full shadow-md text-xs hover:bg-red-500 hover:text-white transition-all"
            >
              ✕
            </button>
          </div>
        ) : (
          <>
            <ImageIcon />
            <p className="text-primary-lightBlue text-sm font-semibold leading-none">
              Drag and Drop Files here
            </p>
            <p className="text-primary-lightBlue text-sm font-semibold leading-none">Or</p>
            <BrowseFileBtn />
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseFile;

// 🔹 Browse button component
const BrowseFileBtn = () => {
  return (
    <button className="relative px-4 py-2 cursor-pointer rounded-lg bg-primary-lightBlue text-white font-semibold hover:bg-primary-darkBlue transition-all">
      Browse File
    </button>
  );
};
