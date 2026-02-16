import { GameDataRepository } from "../repositories/GameDataRepositoy";

export function GameData() {
  const gameDataService: GameDataRepository = new GameDataRepository();

  return (
    <>
      <div className="h-full w-full bg-black border-2 rounded-4xl border-green-400 flex flex-col p-4">

      </div>
    </>
  );
}
