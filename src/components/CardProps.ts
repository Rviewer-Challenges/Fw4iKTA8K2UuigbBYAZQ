import CardType from "../types/CardType";

export default interface CardProps {
    cardElement: CardType;
    handleClick: (cardId: number) => void;
}
