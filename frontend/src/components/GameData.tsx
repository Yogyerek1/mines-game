import { GameDataRepository } from "../repositories/GameDataRepositoy";
import { minBombs, maxBombs } from "../config";
import { useState } from "react";

export function GameData() {
  const gameDataService: GameDataRepository = new GameDataRepository();

  const [bombs, setBombs] = useState(gameDataService.getBombs);
  const [betAmount, setBetAmount] = useState(gameDataService.getBetAmount);

  const handleBombChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBombs(Number(e.target.value));
  };

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBetAmount(Number(e.target.value));
  };

  const handleStartGame = (e: React.MouseEvent<HTMLButtonElement>) => {
    gameDataService.generateCards(bombs, maxBombs + 1);
  };

  const handleCashOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Cashing out ...");
  };

  return (
    <>
      <div className="h-full w-full bg-transparent border-2 rounded-4xl border-green-400 flex flex-col p-6 items-center">
        <h1 className="text-orange-400 font-bold text-2xl mt-2 mb-12">
          BALANCE: $10,500
        </h1>

        <div className="w-full max-w-sm flex flex-col items-center">
          <input
            type="text"
            className="w-full border rounded border-gray-600 bg-gray-900 text-white py-2 px-3 mb-10"
            placeholder="BET AMOUNT"
            onChange={handleBetAmountChange}
          />

          <div className="flex justify-between w-full mb-2.5 px-1">
            <span className="text-white">
              BOMBS ({minBombs} - {maxBombs}):
            </span>
            <span className="text-white">{bombs}</span>
          </div>

          <input
            type="range"
            min={minBombs}
            max={maxBombs}
            value={bombs}
            onChange={handleBombChange}
            className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer mb-8"
          />

          <button className="text-black bg-green-700 border-0 rounded-full py-1 px-6 font-bold text-xl mb-4 hover:scale-95 transition duration-100" onClick={handleStartGame}>
            START GAME
          </button>
          <button className="text-black bg-orange-500 border-0 rounded-full py-1 px-6 font-bold text-xl hover:scale-95 transition duration-100" onClick={handleCashOut}>
            CASH OUT
          </button>
        </div>
      </div>
    </>
  );
}
