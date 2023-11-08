import type { GameDifficulty, MockQuestion, Question } from "@/utils/types";
import { create } from "zustand";
import { mapDifficulty } from "@/utils/mapDifficulty";

export type GameState = {
  id: string;
  userId: string | undefined;
  difficulty: GameDifficulty;
  score: number;
  hintsLeft: number;
  lifes: number;
  timeToAnswerSeconds: number;
  isSplitAnswersUsed: boolean;
  isCallFriendUsed: boolean;
  isGetHelpUsed: boolean;
  currentQuestion: MockQuestion | null;
};

export type Action = {
  createNewGame: (
    gameId: GameState["id"],
    difficulty: GameState["difficulty"],
  ) => void;
  updateGameId: (id: GameState["id"]) => void;
  updateUserId: (userId: GameState["userId"]) => void;
  changeDifficulty: (difficulty: GameState["difficulty"]) => void;
  changeQuestion: (question: GameState["currentQuestion"]) => void;
  answerCorrect: () => void;
  useSplit: () => void;
  useCallFriend: () => void;
  useGetHelp: () => void;
  loseLive: () => void;
  useHint: () => void;
};

// Create your store, which includes both state and (optionally) actions
export const useGameStore = create<GameState & Action>((set) => ({
  id: "",
  difficulty: "easy",
  score: 0,
  hintsLeft: 3,
  lifes: 3,
  isCallFriendUsed: false,
  isSplitAnswersUsed: false,
  isGetHelpUsed: false,
  timeToAnswerSeconds: 90,
  userId: undefined,
  currentQuestion: null,
  createNewGame: (gameId, difficulty) =>
    set((state) => {
      const settings = mapDifficulty(difficulty);
      return { ...state, gameId, difficulty, ...settings };
    }),
  changeQuestion: (question) =>
    set((state) => ({ ...state, currentQuestion: question })),
  updateGameId: (id) => set((state) => ({ ...state, id })),
  updateUserId: (userId) => set((state) => ({ ...state, userId })),
  answerCorrect: () => set((state) => ({ ...state, score: state.score + 1 })),
  useSplit: () => set((state) => ({ ...state, isSplitAnswersUsed: true })),
  useCallFriend: () => set((state) => ({ ...state, isCallFriendUsed: true })),
  useGetHelp: () => set((state) => ({ ...state, isGetHelpUsed: true })),
  loseLive: () => set((state) => ({ ...state, lifes: state.lifes - 1 })),
  useHint: () => set((state) => ({ ...state, hintsLeft: state.hintsLeft - 1 })),
  changeDifficulty: (difficulty) =>
    set((state) => {
      const settings = mapDifficulty(difficulty);
      return { ...state, difficulty, ...settings };
    }),
}));
