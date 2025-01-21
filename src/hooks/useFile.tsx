import { useRef, useState } from "react";

export const useFile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isDropping, setIsDropping] = useState<boolean>(false);
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDropping(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setSelectedFile(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    } else {
      setSelectedFile(null); // Fallback if no file is dropped
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragLeave = () => {
    setIsDropping(false);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsDropping(true);
  };

  return {
    selectedFile,
    isDropping,
    setSelectedFile,
    fileInputRef,
    handleDragEnter,
    handleDrop,
    handleDragLeave,
    handleDragOver,
  };
};
