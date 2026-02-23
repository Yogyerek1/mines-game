import { useMemo } from "react";
import { Card } from "./Card";
import { CardModel } from "../models/CardModel";
import { CardType } from "../models/CardType";
import { maxBombs, BACKEND_URL } from "../config";
import { useGame } from "../contexts/GameContext";
import { useUser } from "../contexts/UserContext";

export function Game() {
  const {
    gameCards,
    setGameCards,
    isGameActive,
    bombs,
    currentWin,
    setCurrentWin,
    revealAllAndReset,
  } = useGame();
  const { userData, triggerToplistRefresh, updateUserScore } = useUser();

  const saveScoreToBackend = async (score: number) => {
    try {
      const response = await fetch(`${BACKEND_URL}/users/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ score }),
      });

      if (response.ok) {
        console.log("Score saved successfully");
      }
    } catch (error) {
      console.error("Failed to save score:", error);
    }
  };

  const displayCards = useMemo(() => {
    if (gameCards.length > 0) {
      return gameCards;
    } else {
      return Array.from({ length: 16 }, () => new CardModel(CardType.Safe));
    }
  }, [gameCards]);

  const handleCardClick = (index: number) => {
    if (!isGameActive) return;

    if (gameCards[index].Revealed) return;

    const updatedCards = [...gameCards];
    updatedCards[index].Revealed = true;
    setGameCards(updatedCards);

    if (gameCards[index].CardType === CardType.Safe) {
      const newWin = currentWin * calculateMultiplier(bombs);
      setCurrentWin(newWin);

      const totalSafeCards = maxBombs + 1 - bombs;
      const revealedSafeCards = updatedCards.filter(
        (card) => card.Revealed && card.CardType === CardType.Safe,
      ).length;

      if (revealedSafeCards === totalSafeCards && isGameActive) {
        const finalScore = (userData?.score ?? 0) + newWin;
        updateUserScore(finalScore);
        saveScoreToBackend(finalScore);
        triggerToplistRefresh();

        revealAllAndReset();
        setCurrentWin(0);
      }
    } else if (gameCards[index].CardType === CardType.Bomb && isGameActive) {
      saveScoreToBackend(userData?.score ?? 0);
      triggerToplistRefresh();

      revealAllAndReset();
      setCurrentWin(0);
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
      <div className="flex flex-col items-center">
        <span className="font-bold text-center text-gray-200 m-2">
          Current Multiplier: {calculateMultiplier(bombs).toFixed(2)}x
        </span>
        <span className="font-bold text-center text-green-400 m-2">
          Potential Win: ${currentWin.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
