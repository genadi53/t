"use client";
import { useGameStore } from "@/store/store";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GameEnded({ params }: { params: { gameId: string } }) {
  const gameId = params.gameId;
  const state = useGameStore();

  return (
    <main className="h-screen w-full text-black">
      <div>{state.gameId}</div>
      <div>
        <div>Your score is {state.score ? state.score : "0"}</div>

        <Link href={"/"}>
          <Button>play Again?</Button>
        </Link>
      </div>
    </main>
  );
}
