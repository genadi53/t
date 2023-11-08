"use client";
import { useGameStore } from "@/store/store";
import { api } from "@/trpc/react";

export default function Game({ params }: { params: { gameId: string } }) {
  // const { gameId } = useParams();
  const gameId = params.gameId;
  const state = useGameStore();
  const createNextQuestion = api.game.generateNextQuestion.useMutation();

  return (
    <main className="h-screen w-full text-black">
      <div>{gameId}</div>
      <div>
        {state.currentQuestion?.question}
        <div>
          {state.currentQuestion?.answers.map((a) => (
            <div
              key={a.text}
              onClick={async () => {
                // console.log(a.isCorrect);
                if (!a.isCorrect && state.lifes - 1 <= 0) {
                  //game over
                } else {
                  // gen next question
                  const question = await createNextQuestion.mutateAsync({
                    gameId,
                    previousNumber: state.score + 1,
                  });
                  console.log(question);
                  state.answerCorrect();
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
