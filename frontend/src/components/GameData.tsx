import { GameDataRepository } from "../repositories/GameDataRepositoy";
import { minBombs, maxBombs } from "../config";

export function GameData() {
  const gameDataService: GameDataRepository = new GameDataRepository();

  return (
    <>
      <div className="h-full w-full bg-black border-2 rounded-4xl border-green-400 flex flex-col p-6 items-center">
        <h1 className="text-orange-400 font-bold text-xl mt-2 mb-16">
          BALANCE: $10,500
        </h1>

        <div className="w-full max-w-sm flex flex-col items-center">
          <input
            type="text"
            className="w-full border rounded border-gray-600 bg-gray-900 text-white py-2 px-3 mb-10"
            placeholder="BET AMOUNT"
          />

          <div className="flex justify-between w-full mb-2.5 px-1">
            <span className="text-white">BOMBS ({minBombs} - {maxBombs}):</span>
            <span className="text-white">5</span>
          </div>

          <input
            type="range"
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}
