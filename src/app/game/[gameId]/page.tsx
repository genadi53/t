"use client";
import React from "react";

export default function Game({ params }: { params: { gameId: string } }) {
  // const { gameId } = useParams();
  const gameId = params.gameId;

  return (
    <main className="h-screen w-full text-black">
      <div>{gameId}</div>
    </main>
  );
}
