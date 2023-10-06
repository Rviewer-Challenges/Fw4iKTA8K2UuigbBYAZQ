import React, { useEffect, useState } from "react";
import "./Game.scss";
import Card from "../../components/Card/Card";
import CardType from "../../types/CardType";

export default function Game() {
    const [array, setArray] = useState<CardType[]>([
        { id: 1, hiddenElement: "a", isFlipped: false, isMatched: false },
        { id: 2, hiddenElement: "b", isFlipped: false, isMatched: false },
        { id: 3, hiddenElement: "c", isFlipped: false, isMatched: false },
        { id: 4, hiddenElement: "d", isFlipped: false, isMatched: false },
    ]);
    const [flippedCardsNumber, setFlippedCardsNumber] = useState<number>(0);
    const [flippedCardsContent, setFlippedCardsContent] = useState<string[]>(
        []
    );
    const [isFinished, setIsfinished] = useState<boolean>(false);

    const startGame = (): void => {
        const duplicatedArray: CardType[] = array.map((card) => ({
            id: card.id + array.length,
            hiddenElement: card.hiddenElement,
            isFlipped: false,
            isMatched: false,
        }));
        const shuffledArray: CardType[] = [...array, ...duplicatedArray].sort(
            () => Math.random() - 0.5
        );

        setArray(shuffledArray);
    };

    const flippedNotMatchedCards = async (
        arrayElements: CardType[]
    ): Promise<void> => {
        setTimeout(() => {
            setArray(
                arrayElements.map((card) =>
                    card.isMatched === false
                        ? { ...card, isFlipped: false }
                        : { ...card, isFlipped: true }
                )
            );
        }, 500);
        setFlippedCardsContent([]);
    };

    const handleFlip = (cardId: number): void => {
        let updatedArray: CardType[];
        const targetCard: CardType | undefined = array.find(
            (element) => element.id === cardId
        );

        updatedArray = array.map((card) =>
            card.id === cardId ? { ...card, isFlipped: !card.isFlipped } : card
        );

        if (targetCard) {
            if (!flippedCardsContent.includes(targetCard.hiddenElement))
                setFlippedCardsContent([
                    ...flippedCardsContent,
                    targetCard.hiddenElement,
                ]);
            else
                updatedArray = updatedArray.map((card) =>
                    card.hiddenElement === targetCard.hiddenElement
                        ? { ...card, isMatched: true }
                        : card
                );
        }

        setArray(updatedArray);

        if (flippedCardsNumber + 1 >= 2) {
            setFlippedCardsNumber(0);
            flippedNotMatchedCards(updatedArray);
        } else {
            setFlippedCardsNumber(flippedCardsNumber + 1);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => startGame(), []);

    useEffect(() => {
        const isCompleted: boolean = array.every(
            (element) =>
                element.isMatched === true && element.isFlipped === true
        );
        if (isCompleted && !isFinished) {
            setIsfinished(true);
            const timeoutId: NodeJS.Timer = setInterval(() => {
                alert("¡HAS GANADO!");
                clearInterval(timeoutId);
            }, 1000);
        }
        // eslint-disable-next-line
    }, [array]);

    return (
        <div className="game-container">
            {array.map((element, index) => (
                <Card
                    key={index}
                    cardElement={element}
                    handleClick={(targetCard) => handleFlip(targetCard)}
                />
            ))}
        </div>
    );
}
