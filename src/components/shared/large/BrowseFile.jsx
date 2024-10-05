/* eslint-disable react/prop-types */
import { useState } from "react";
import ImageIcon from "../../../assets/svgs/stepper/ImageIcon";

const BrowseFile = ({ setFile, previewValue, setPreviewValue }) => {
  const [dragActive, setDragActive] = useState(false);

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
  const handleFileChange = ({ event, setPreviewValue, previewImage, setFile }) => {
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

  return (
    <div
      className={`mt-3 border border-dashed rounded-lg p-4 h-[200px] md:h-[290px] grid place-items-center relative ${
        dragActive
          ? "border-primary-lightBlue bg-[rgba(200,240,255)]"
          : "border-primary-lightBlue bg-[rgba(235,250,255)]"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
    >
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
            <BrowseFileBtn
              onFileChange={(e) =>
                handleFileChange({
                  event: e,
                  setPreviewValue,
                  previewImage,
                  setFile,
                })
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseFile;

const BrowseFileBtn = ({ onFileChange }) => {
  return (
    <button className="relative px-4 py-2 cursor-pointer rounded-lg bg-primary-lightBlue text-white font-semibold">
      Browse File
      <input
        type="file"
        id="fileInput"
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={onFileChange}
      />
    </button>
  );
};
