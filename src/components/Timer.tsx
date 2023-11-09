import React, { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import animationData from "@/../public/hourglass-animation.json";
import { useCountdown } from "@/hooks/useCountdown";
import { convertSecondsToReadableTime } from "@/utils/time";

type TimerProps = {
  seconds: number;
  size?: string | number;
  onFinish: () => void;
  reset: boolean;
  // onReset: () => void;
};

export const Timer: React.FC<TimerProps> = ({
  size,
  onFinish,
  seconds,
  reset,
}) => {
  const animationRef = useRef<LottieRefCurrentProps>(null);
  const { secondsLeft, start } = useCountdown(seconds, onFinish);

  useEffect(() => {
    if (reset) {
      start(seconds);
    }
  }, [reset, seconds, start]);

  return (
    <div
      className={"relative flex flex-col items-center bg-red-400"}
      style={{ width: size, height: size }}
    >
      <Lottie
        className="-mt-1"
        loop={secondsLeft > 0 ? true : false}
        lottieRef={animationRef}
        animationData={animationData}
      />
      <div className="absolute -bottom-1 w-full text-center text-base font-semibold">
        {convertSecondsToReadableTime(secondsLeft)}
      </div>
    </div>
  );
};
