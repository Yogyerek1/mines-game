import { useMemo } from "react";
import { Card } from "./Card";
import { CardModel } from "../models/CardModel";
import { CardType } from "../models/CardType";

type GameProps = {
  gameCards: CardModel[];
  setGameCards: (cards: CardModel[]) => void;
  isGameActive: boolean;
};

export function Game({ gameCards, setGameCards, isGameActive }: GameProps) {
  const displayCards = useMemo(() => {
    if (isGameActive) {
      return gameCards;
    } else {
      return Array.from({ length: 16 }, () => new CardModel(CardType.Safe));
    }
  }, [isGameActive, gameCards]);
  const handleCardClick = (index: number) => {
    const updatedCards = [...gameCards];
    updatedCards[index].Revealed = true;
    setGameCards(updatedCards);
  };

  return (
    <div className="flex flex-col bg-transparent h-full w-full border-0">
      <div className="grid grid-cols-4 grid-rows-4 gap-2 p-1">
        {displayCards.map((card, index) => (
          <Card
            key={index}
            card={card}
            onClick={() => isGameActive && handleCardClick(index)}
          />
        ))}
      </div>
      <span className="font-bold text-center text-gray-200 m-12">
        Current Multiplier:
      </span>
    </div>
  );
}
