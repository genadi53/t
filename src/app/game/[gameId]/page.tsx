import React from "react";

export default function Game(props: { params: { id: string } }) {
  const gameId = props.params.id;
  return <main>{gameId}</main>;
}
