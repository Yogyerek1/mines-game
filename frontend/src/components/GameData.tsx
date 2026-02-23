import { GameDataRepository } from "../repositories/GameDataRepositoy";
import { minBombs, maxBombs, BACKEND_URL } from "../config";
import { useUser } from "../contexts/UserContext";
import { useGame } from "../contexts/GameContext";

export function GameData() {
  const {
    bombs,
    setBombs,
    setBetAmount,
    betAmount,
    setGameCards,
    setIsGameActive,
    isGameActive,
    setCurrentWin,
    currentWin,
    revealAllAndReset,
  } = useGame();
  const { userData, updateUserScore, triggerToplistRefresh } = useUser();

  const gameDataService: GameDataRepository = new GameDataRepository();

  const handleBombChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBombs(Number(e.target.value));
  };

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBetAmount(Number(e.target.value));
  };

  const handleStartGame = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isGameActive) {
      alert("Game is already active!");
      return;
    }

    if (betAmount < 1) {
      alert("Minimum bet amount is $1!");
      return;
    }

    if (betAmount > (userData?.score ?? 0)) {
      alert(`You not have enough money! ${e}`);
      return;
    }
    
    const newScore = (userData?.score ?? 0) - betAmount;
    updateUserScore(newScore);

    setCurrentWin(betAmount);

    const generatedCards = gameDataService.generateCards(bombs, maxBombs + 1);
    setGameCards(generatedCards);
    setIsGameActive(true);
  };

  const handleCashOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isGameActive) {
      alert("No active game to cash out!");
      return;
    }

    const newScore = (userData?.score ?? 0) + currentWin;

    updateUserScore(newScore);

    revealAllAndReset();
    setCurrentWin(0);

    try {
      const response = await fetch(`${BACKEND_URL}/users/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ score: newScore }),
      });

      if (response.ok) {
        console.log("Cash out successful! Score saved.");
        triggerToplistRefresh();
      } else {
        console.error("Failed to save score to backend");
      }
    } catch (error) {
      console.error("Error during cash out:", error);
    }
  };

  return (
    <>
      <div className="h-full w-full bg-transparent border-2 rounded-4xl border-green-400 flex flex-col p-6 items-center">
        <h1 className="text-orange-400 font-bold text-2xl mt-2 mb-12">
          BALANCE: ${userData?.score?.toFixed(2) ?? "0.00"}
        </h1>

        <div className="w-full max-w-sm flex flex-col items-center">
          <input
            type="string"
            min="1"
            step="0.01"
            className="w-full border rounded border-gray-600 bg-gray-900 text-white py-2 px-3 mb-10 disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="BET AMOUNT (min $1)"
            onChange={handleBetAmountChange}
            disabled={isGameActive}
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
            className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isGameActive}
          />

          <button
            className="text-black bg-green-700 border-0 rounded-full py-1 px-6 font-bold text-xl mb-4 hover:scale-95 transition duration-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            onClick={handleStartGame}
            disabled={isGameActive}
          >
            START GAME
          </button>
          <button
            className="text-black bg-orange-500 border-0 rounded-full py-1 px-6 font-bold text-xl hover:scale-95 transition duration-100"
            onClick={handleCashOut}
          >
            CASH OUT
          </button>
        </div>
      </div>
    </>
  );
}
