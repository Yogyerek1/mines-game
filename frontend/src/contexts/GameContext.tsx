import { createContext, useContext, useState, type ReactNode } from "react";
import { CardModel } from "../models/CardModel";

interface GameContextType {
  bombs: number;
  setBombs: (v: number) => void;
  betAmount: number;
  setBetAmount: (v: number) => void;
  gameCards: CardModel[];
  setGameCards: (cards: CardModel[]) => void;
  isGameActive: boolean;
  setIsGameActive: (v: boolean) => void;
}

const GameContext = createContext<GameContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [bombs, setBombs] = useState(3);
  const [betAmount, setBetAmount] = useState(0);
  const [gameCards, setGameCards] = useState<CardModel[]>([]);
  const [isGameActive, setIsGameActive] = useState(false);

  return (
    <GameContext.Provider
      value={{
        bombs,
        setBombs,
        betAmount,
        setBetAmount,
        gameCards,
        setGameCards,
        isGameActive,
        setIsGameActive,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
