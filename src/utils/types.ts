export type GameDifficulty = "easy" | "intermediate" | "hard";
export type QuestionDifficulty = "easy" | "intermediate" | "hard" | "expert";
export type QuesionAnswer = "A" | "B" | "C" | "D";

export type Question = {
  id: number;
  number: number;
  gameId: string;
  difficulty: QuestionDifficulty;
  questionText: string;
  explanation: string;
  answers: Answer[];
};

export type Answer = {
  id: number;
  questionId: number;
  answerText: string;
  isCorrect: boolean;
  isSelected: boolean;
};

export type MockQuestion = {
  number: number;
  difficulty: string;
  question: string;
  explanation: string;
  answers: { text: string; isCorrect: boolean }[];
};
