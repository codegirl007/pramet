import React, { ReactElement, useEffect, useState } from "react";

export const Timer = (): ReactElement => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      setSeconds((second) => second + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  return <strong>{seconds}</strong>;
};
