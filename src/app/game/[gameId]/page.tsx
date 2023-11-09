"use client";
import { Timer } from "@/components/Timer";
import { useGameStore } from "@/store/store";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Game({ params }: { params: { gameId: string } }) {
  // const { gameId } = useParams();
  const router = useRouter();
  const gameId = params.gameId;
  const state = useGameStore();
  const createNextQuestion = api.game.generateNextQuestion.useMutation();
  const endTheGameMutation = api.game.endTheGame.useMutation();

  const onGameOver = () => {
    if (!state.gameId) return;
    endTheGameMutation.mutate({
      gameId: state.gameId,
      score: state.score,
    });
    state.setGameOver();
    router.push(`/game/${gameId}/ended`);
  };

  if (state.isGameOver) {
    onGameOver();
  }

  return (
    <main className="h-screen w-full text-black">
      <div>{gameId}</div>
      {/* {state.timeToAnswerSeconds ? (
        <Timer
          onFinish={async () => {
            await onGameOver();
          }}
          seconds={state.timeToAnswerSeconds}
          size={50}
          reset={restart}
        />
      ) : null} */}
      <div>
        {state.currentQuestion?.question}
        <div>
          {state.currentQuestion?.answers.map((a) => (
            <div
              key={a.text}
              onClick={async () => {
                // console.log(a.isCorrect);
                if (!a.isCorrect && state.lifes - 1 <= 0) {
                  onGameOver();
                } else {
                  // gen next question
                  const question = await createNextQuestion.mutateAsync({
                    gameId,
                    previousNumber: state.score + 1,
                  });
                  console.log(question);
                  state.updatScore();
                  state.changeQuestion(question);
                }
              }}
            >
              {a.text}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
