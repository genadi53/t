import type { GameDifficulty } from "@/utils/types";
import { create } from "zustand";
import { mapDifficulty } from "@/utils/mapDifficulty";

export type GameState = {
  id: string;
  userId: string | undefined;
  difficulty: GameDifficulty;
  hintsLeft: number;
  lifes: number;
  timeToAnswerSeconds: number;
  isSplitAnswersUsed: boolean;
  isCallFriendUsed: boolean;
  isGetHelpUsed: boolean;
};

export type Action = {
  createNewGame: (gameDetails: GameState) => void;
  updateGameId: (id: GameState["id"]) => void;
  updateUserId: (userId: GameState["userId"]) => void;
  changeDifficulty: (difficulty: GameState["difficulty"]) => void;
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
  hintsLeft: 3,
  lifes: 3,
  isCallFriendUsed: false,
  isSplitAnswersUsed: false,
  isGetHelpUsed: false,
  timeToAnswerSeconds: 90,
  userId: undefined,
  createNewGame: (gameDetails: GameState) => set(() => ({ ...gameDetails })),
  updateGameId: (id) => set(() => ({ id })),
  updateUserId: (userId) => set(() => ({ userId })),
  useSplit: () => set(() => ({ isSplitAnswersUsed: true })),
  useCallFriend: () => set(() => ({ isCallFriendUsed: true })),
  useGetHelp: () => set(() => ({ isGetHelpUsed: true })),
  loseLive: () => set((state) => ({ lifes: state.lifes - 1 })),
  useHint: () => set((state) => ({ hintsLeft: state.hintsLeft - 1 })),
  changeDifficulty: (difficulty) =>
    set(() => {
      const settings = mapDifficulty(difficulty);
      return { difficulty, ...settings };
    }),
}));
