import { useMemo, useState, useEffect } from "react";
import { Card } from "./Card";
import { CardModel } from "../models/CardModel";
import { CardType } from "../models/CardType";
import { maxBombs } from "../config";

type GameProps = {
  gameCards: CardModel[];
  setGameCards: (cards: CardModel[]) => void;
  isGameActive: boolean;
  bet: number;
  bombCount: number;
};

export function Game({
  gameCards,
  setGameCards,
  isGameActive,
  bet,
  bombCount,
}: GameProps) {
  const [money, setMoney] = useState<number>(bet);

  useEffect(() => {
    setMoney(bet);
  }, [bet]);

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

    if (
      gameCards[index].CardType === CardType.Safe &&
      gameCards[index].Revealed
    ) {
      setMoney(money * calculateMultiplier(bombCount));
      console.log(money);
    }
  };

  const calculateMultiplier = (bombCount: number) => {
    return (maxBombs + 1) / (maxBombs + 1 - bombCount);
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
        Current Multiplier: {calculateMultiplier(bombCount).toFixed(2)}x
      </span>
    </div>
  );
}
