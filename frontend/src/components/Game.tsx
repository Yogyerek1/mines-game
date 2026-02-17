import { useState } from "react";
import { Card } from "./Card";
import { CardModel } from "../models/CardModel";

type GameProps = {
  gameCards: CardModel[];
  setGameCards: (cards: CardModel[]) => void;
};

export function Game({ gameCards, setGameCards }: GameProps) {
  const handleCardClick = (index: number) => {
    const updatedCards = [...gameCards];
    updatedCards[index].Revealed = true;
    setGameCards(updatedCards);
  };

  return (
    <div className="flex flex-col bg-transparent h-full w-full border-0">
      <div className="grid grid-cols-4 grid-rows-4 gap-2 p-1">
        {gameCards.map((card, index) => (
          <Card
            key={index}
            card={card}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
      <span className="font-bold text-center text-gray-200 m-12">
        Current Multiplier:
      </span>
    </div>
  );
}
