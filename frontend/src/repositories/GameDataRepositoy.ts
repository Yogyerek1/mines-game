import { GameDataModel } from "../models/GameData";
import { betAmountDefault, bombsCountDefault } from "../config";

export class GameDataRepository {
    private gameData: GameDataModel;

    constructor() {
        this.gameData = this.setDefaultGameData();
    }

    public get getGameData(): GameDataModel {
        return this.gameData;
    }

    public get getBombs(): number {
        return this.gameData.bombs;
    }

    public get getBetAmount(): number {
        return this.gameData.betAmount;
    }

    public set setGameData(updatedGameData: GameDataModel) {
        if (updatedGameData.betAmount != null) this.gameData.betAmount = updatedGameData.betAmount;
        if (updatedGameData.bombs != null) this.gameData.bombs = updatedGameData.bombs;
    }

    public setDefaultGameData(): GameDataModel {
        this.gameData = new GameDataModel(betAmountDefault, bombsCountDefault);
        return this.gameData;
    }
}