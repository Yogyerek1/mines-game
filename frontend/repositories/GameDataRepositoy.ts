import { GameData } from "../models/GameData";
import { betAmountDefault, bombsCountDefault } from "../src/config";

export class GameDataRepository {
    private gameData: GameData;

    constructor(gameData: GameData) {
        this.gameData = gameData;
    }

    public get getGameData(): GameData {
        return this.gameData;
    }

    public set setGameData(updatedGameData: GameData) {
        if (updatedGameData.betAmount != null) this.gameData.betAmount = updatedGameData.betAmount;
        if (updatedGameData.bombs != null) this.gameData.bombs = updatedGameData.bombs;
    }

    public setDefaultGameData(): void {
        this.gameData.betAmount = betAmountDefault;
        this.gameData.bombs = bombsCountDefault;
    }
}