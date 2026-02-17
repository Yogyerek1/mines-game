import QuestionMark from "../assets/QuestionMark.png";
import Diamond from "../assets/Diamond.png";
import Bomb from "../assets/Bomb.png";
import RedBomb from "../assets/RedBomb.png";
import type { CardModel } from "../models/CardModel";
import { CardType } from "../models/CardType";

type CardProps = {
  card: CardModel;
  onClick: () => void;
};

export function Card({ card, onClick }: CardProps) {
  const getImage = () => {
    if (!card.Revealed) return QuestionMark;
    if (card.CardType === CardType.Bomb) return Bomb;
    if (card.CardType === CardType.Safe) return Diamond;
    return QuestionMark;
  };

  return (
    <div
      className="w-18 h-18 bg-gray-800 items-center justify-center border-0 rounded-3xl"
      onClick={onClick}
    >
      <img src={getImage()} alt="" />
    </div>
  );
}
