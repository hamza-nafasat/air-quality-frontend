const handleFileChange = ({ event, setFile, previewImage }) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    convertToBase64(selectedFile, setFile);
    previewImage(selectedFile);
  }
};

export { handleFileChange };
