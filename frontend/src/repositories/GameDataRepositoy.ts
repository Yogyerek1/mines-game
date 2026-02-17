import { GameDataModel } from "../models/GameData";
import { betAmountDefault, bombsCountDefault } from "../config";
import {CardModel} from "../models/CardModel";
import { CardType } from "../models/CardType";

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

    public set setBombs(bombs: number) {
        this.gameData.bombs = bombs;
    }

    public set setBetAmount(bet: number) {
        this.gameData.betAmount = bet;
    }

    public set setGameData(updatedGameData: GameDataModel) {
        if (updatedGameData.betAmount != null) this.gameData.betAmount = updatedGameData.betAmount;
        if (updatedGameData.bombs != null) this.gameData.bombs = updatedGameData.bombs;
    }

    public setDefaultGameData(): GameDataModel {
        this.gameData = new GameDataModel(betAmountDefault, bombsCountDefault);
        return this.gameData;
    }

    public generateCards(bombCount: number, cardCount: number): CardModel[] {
        let cards: CardModel[] = [];

        for(let i = 0; i < cardCount; i++) {
            cards.push(new CardModel(CardType.Safe));
        }

        let bombIndexes: number[] = [];
        for(let i = 0; i < bombCount; i++) {
            let index: number = Math.floor(Math.random() * 16);

            while(bombIndexes.includes(index)) {
                index = Math.floor(Math.random() * 16);
            }
            
            bombIndexes.push(index);
        }

        for (let i = 0; i < bombIndexes.length; i++) {
            cards[bombIndexes[i]].CardType = CardType.Bomb;
        }

        return cards;
    }
}