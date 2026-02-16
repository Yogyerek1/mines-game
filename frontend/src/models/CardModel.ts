import type { CardType } from "./CardType";

export class CardModel{
    CardType: CardType;
    Revealed: boolean;

    constructor(CardType: CardType){
        this.CardType = CardType;
        this.Revealed = false;
    }
}