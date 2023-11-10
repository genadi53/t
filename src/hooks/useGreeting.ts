import { CONSTANTS } from "@/utils/constants";
import { getRandomNumber } from "@/utils/random";
import { useEffect, useState } from "react";

export function useGreeting(
  greetings: string[],
  change: boolean,
  interval?: number,
) {
  const [currentIdx, setCurrentIdx] = useState<number>(
    getRandomNumber(0, greetings.length),
  );
  const initialGreet = greetings[currentIdx];
  const [currentGreet, setCurrentGreet] = useState<string>(
    initialGreet ? initialGreet : greetings[0]!,
  );

  useEffect(() => {
    const generateRandomGreetInterval = setInterval(
      () => {
        let selectingDifferentMessage = true;

        while (selectingDifferentMessage) {
          const newIdx = getRandomNumber(0, greetings.length);
          if (newIdx === currentIdx) {
            selectingDifferentMessage = true;
          } else {
            if (change) {
              selectingDifferentMessage = false;
              const newGreet = greetings[newIdx];
              setCurrentGreet(newGreet ? newGreet : greetings[0]!);
              setCurrentIdx(newIdx);
            }
          }
        }
      },
      interval ? interval : CONSTANTS.GREET_INTERVAL,
    );

    return () => {
      clearInterval(generateRandomGreetInterval);
    };
  }, [currentGreet, greetings, currentIdx]);

  return { currentGreet };
}
