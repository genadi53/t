import type { GameDifficulty, MockQuestion, Question } from "@/utils/types";
import { create } from "zustand";
import { mapDifficulty } from "@/utils/mapDifficulty";
import { CONSTANTS } from "@/utils/constants";

export type GameState = {
  gameId: string | null;
  userId: string | undefined;
  difficulty: GameDifficulty;
  totalQuestions: number;
  score: number;
  hintsLeft: number;
  lifes: number;
  timeToAnswerSeconds: number;
  isGameOver: boolean;
  isGameWon: boolean;
  isSplitAnswersUsed: boolean;
  isCallFriendUsed: boolean;
  isAudienceUsed: boolean;
  currentQuestion: MockQuestion | null;
};

export type Action = {
  createNewGame: (
    gameId: GameState["gameId"],
    difficulty: GameState["difficulty"],
    userId?: GameState["userId"],
  ) => void;
  updateGameId: (gameId: GameState["gameId"]) => void;
  updateUserId: (userId: GameState["userId"]) => void;
  changeDifficulty: (difficulty: GameState["difficulty"]) => void;
  changeQuestion: (question: GameState["currentQuestion"]) => void;
  updatScore: () => void;
  useSplit: () => void;
  useCallFriend: () => void;
  useAudienceHelp: () => void;
  loseLive: () => void;
  useHint: () => void;
  setGameOver: () => void;
};

const initialState: GameState = {
  gameId: null,
  difficulty: "easy",
  score: CONSTANTS.INITIAL_SCORE,
  isGameOver: false,
  isGameWon: false,
  totalQuestions: CONSTANTS.MAX_SCORE,
  isCallFriendUsed: false,
  isSplitAnswersUsed: false,
  isAudienceUsed: false,
  userId: undefined,
  currentQuestion: null,
  hintsLeft: CONSTANTS.HINTS_INTERMEDIATE,
  lifes: CONSTANTS.LIFES_INTERMEDIATE,
  timeToAnswerSeconds: CONSTANTS.TIME_SECONDS_INTERMEDIATE,
};

// Create your store, which includes both state and (optionally) actions
export const useGameStore = create<GameState & Action>((set) => ({
  ...initialState,
  createNewGame: (gameId, difficulty, userId) =>
    set(() => {
      const settings = mapDifficulty(difficulty);
      return {
        ...initialState,
        gameId,
        difficulty,
        userId,
        ...settings,
      };
    }),
  changeQuestion: (question) =>
    set((state) => ({ ...state, currentQuestion: question })),
  updateGameId: (gameId) => set((state) => ({ ...state, gameId })),
  updateUserId: (userId) => set((state) => ({ ...state, userId })),
  updatScore: () =>
    set((state) => ({
      ...state,
      score: state.score + 1,
      isGameOver: state.score === CONSTANTS.MAX_SCORE ? true : false,
      isGameWon: state.score === CONSTANTS.MAX_SCORE ? true : false,
    })),
  useSplit: () => set((state) => ({ ...state, isSplitAnswersUsed: true })),
  useCallFriend: () => set((state) => ({ ...state, isCallFriendUsed: true })),
  useAudienceHelp: () => set((state) => ({ ...state, isAudienceUsed: true })),
  loseLive: () => set((state) => ({ ...state, lifes: state.lifes - 1 })),
  useHint: () => set((state) => ({ ...state, hintsLeft: state.hintsLeft - 1 })),
  changeDifficulty: (difficulty) =>
    set((state) => {
      const settings = mapDifficulty(difficulty);
      return { ...state, difficulty, ...settings };
    }),
  setGameOver: () => set((state) => ({ ...state, isGameOver: true })),
}));
