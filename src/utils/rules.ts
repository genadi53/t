import { mapDifficulty } from "./mapDifficulty";
import { type GameDifficulty } from "./types";

export const getRules = (difficulty: GameDifficulty) => {
  const { hintsLeft, lifes, timeToAnswerSeconds } = mapDifficulty(difficulty);
  return [
    `There are a total of 15 questions, each with increasing difficulty and value.
    You start at the first question, which is the easiest and worth $100. As you progress, the questions become more challenging and worth more money.
    You have four lifelines that you can use to help you answer questions. These lifelines are:
    Ask the Audience: You can ask the virtual audience for their opinion on the correct answer.
    50:50: Two incorrect answer choices will be eliminated, leaving you with a 50% chance of selecting the correct answer.
    Phone a Friend: You can call a friend for assistance in answering the question.
    Double Dip: You can make two attempts to answer a question but must commit to your second choice if you decide to use this lifeline.
    Change the Question: You can change question a new one.`,

    `You will have ${
      timeToAnswerSeconds ? `${timeToAnswerSeconds} seconds` : "unlimited time"
    } to answer the question.`,
    `${
      lifes === 1
        ? "You play until incorrect answer."
        : `You have ${lifes} chances, before you are done.`
    }`,
    `You will have ${
      hintsLeft ? `${hintsLeft} hints` : `0 hints`
    } durring the game.`,
  ];
};
