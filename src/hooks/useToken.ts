import { useEffect, useState } from "react";

export const useTokenExpiry = (expiryTimestamp?: number) => {
  const [expiresIn, setExpiresIn] = useState<number>(() => {
    if (!expiryTimestamp) return 60; // Default to 60 seconds if no timestamp provided
    const remainingTime = Math.max(0, Math.floor((expiryTimestamp - Date.now()) / 1000));
    return remainingTime;
  });

  useEffect(() => {
    if (expiresIn <= 0) return;

    const intervalId = setInterval(() => {
      setExpiresIn((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expiresIn]);

  return expiresIn;
};
