import { useEffect, useState } from "react";

export function useCountdown(
  timeInSeconds: number,
  callback: () => void,
  interval = 1000,
) {
  const [secondsLeft, setSecondsLeft] = useState<number>(timeInSeconds);

  useEffect(() => {
    if (secondsLeft <= 0 && callback) {
      callback();
      return;
    }

    const timeout = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
    }, interval);

    return () => clearTimeout(timeout);
  }, [secondsLeft]);

  function start(seconds: number) {
    setSecondsLeft(seconds);
  }

  return { secondsLeft, start };
}
