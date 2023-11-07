import { CONSTANTS } from "./constants";

export const mapDifficulty = (difficulty: "easy" | "intermediate" | "hard") => {
  if (difficulty === "easy") {
    return {
      hintsLeft: CONSTANTS.HINTS_EASY,
      lifes: CONSTANTS.LIFES_EASY,
      timeToAnswerSeconds: CONSTANTS.TIME_SECONDS_EASY,
    };
  }

  if (difficulty === "intermediate") {
    return {
      hintsLeft: CONSTANTS.HINTS_INTERMEDIATE,
      lifes: CONSTANTS.LIFES_INTERMEDIATE,
      timeToAnswerSeconds: CONSTANTS.TIME_SECONDS_INTERMEDIATE,
    };
  }

  if (difficulty === "hard") {
    return {
      hintsLeft: CONSTANTS.HINTS_HARD,
      lifes: CONSTANTS.LIFES_HARD,
      timeToAnswerSeconds: CONSTANTS.TIME_SECONDS_HARD,
    };
  }

  return {
    hintsLeft: CONSTANTS.HINTS_INTERMEDIATE,
    lifes: CONSTANTS.LIFES_INTERMEDIATE,
    timeToAnswerSeconds: CONSTANTS.TIME_SECONDS_INTERMEDIATE,
  };
};
