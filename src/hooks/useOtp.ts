import { useEffect, useRef, useState } from "react";

export const useOtp = () => {
  const length = 6;
  const [otp, setOTP] = useState<string[]>([]);
  const [values, setValues] = useState<string[]>(Array.from({ length }, () => ""));
  const inputRefs = useRef<HTMLInputElement[]>(Array(length).fill(null));

  const onChange = (values: string[]) => {
    setOTP(values);
  };

  useEffect(() => {
    window.addEventListener("load", () => {
      inputRefs.current[0]?.focus();
    });

    console.log(values);
    console.log(otp.join(""));
  }, []);

  const handleChange = (value: string, index: number) => {
    const updatedOtp = [...values];

    updatedOtp[index] = value;
    setValues(updatedOtp);
    onChange(updatedOtp);

    if (value !== "" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === "Backspace" && index > 0 && values[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    if (/^\d+$/.test(pasteData) && pasteData.length <= length) {
      const updatedOTP = pasteData.split("").slice(0, length);
      setValues([...updatedOTP, ...Array(length - updatedOTP.length).fill("")]);
      onChange(updatedOTP);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return {
    values,
    handleChange,
    handleKeyDown,
    handlePaste,
    formatTime,
    inputRefs,
  };
};
