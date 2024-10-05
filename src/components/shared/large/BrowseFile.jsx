/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import ImageIcon from "../../../assets/svgs/stepper/ImageIcon";

const BrowseFile = ({ setFile, previewValue, setPreviewValue }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null); // Create a reference for the file input

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      convertToBase64(droppedFile, setPreviewValue);
      previewImage(droppedFile);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      convertToBase64(selectedFile, setPreviewValue);
      previewImage(selectedFile);
    }
  };

  const convertToBase64 = (file, setPreviewValue) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPreviewValue(reader.result);
  };

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewValue(reader.result);
    };
  };

  // Simulate clicking the hidden file input when the div is clicked
  const handleDivClick = () => {
    inputRef.current.click(); // Trigger the file input click
  };

  return (
    <div
      className={`mt-3 border border-dashed rounded-lg p-4 h-[200px] md:h-[290px] grid place-items-center relative ${
        dragActive
          ? "border-primary-lightBlue bg-[rgba(200,240,255)]"
          : "border-primary-lightBlue bg-[rgba(235,250,255)]"
      }`}
      onClick={handleDivClick} // Trigger file input click when div is clicked
      onDragOver={handleDragOver}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="fileInput"
        ref={inputRef} // Set reference to the file input
        className="hidden" // Keep the file input hidden
        onChange={handleFileChange}
      />
      <div className="flex flex-col items-center gap-2">
        {previewValue ? (
          <img
            src={previewValue}
            alt="Uploaded preview"
            className="w-full h-[165px] md:h-[250px] object-cover rounded-lg"
          />
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

const BrowseFileBtn = () => {
  return (
    <button className="relative px-4 py-2 cursor-pointer rounded-lg bg-primary-lightBlue text-white font-semibold">
      Browse File
    </button>
  );
};
