import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDifficulty } from "../../context/Difficulty";
import "./Game.scss";
import Card from "../../components/Card/Card";
import CardType from "../../types/CardType";

export default function Game() {
    const navigate = useNavigate();
    const context = useDifficulty();

    const [gameCards, setGameCards] = useState<CardType[]>([
        { id: 1, hiddenElement: "a", isFlipped: false, isMatched: false },
        { id: 2, hiddenElement: "b", isFlipped: false, isMatched: false },
        { id: 3, hiddenElement: "c", isFlipped: false, isMatched: false },
        { id: 4, hiddenElement: "d", isFlipped: false, isMatched: false },
        { id: 5, hiddenElement: "e", isFlipped: false, isMatched: false },
        { id: 6, hiddenElement: "f", isFlipped: false, isMatched: false },
        { id: 7, hiddenElement: "g", isFlipped: false, isMatched: false },
        { id: 8, hiddenElement: "h", isFlipped: false, isMatched: false },
        { id: 9, hiddenElement: "i", isFlipped: false, isMatched: false },
        { id: 10, hiddenElement: "j", isFlipped: false, isMatched: false },
        { id: 11, hiddenElement: "k", isFlipped: false, isMatched: false },
        { id: 12, hiddenElement: "l", isFlipped: false, isMatched: false },
        { id: 13, hiddenElement: "m", isFlipped: false, isMatched: false },
        { id: 14, hiddenElement: "n", isFlipped: false, isMatched: false },
        { id: 15, hiddenElement: "o", isFlipped: false, isMatched: false },
    ]);
    const [flippedCardsNumber, setFlippedCardsNumber] = useState<number>(0);
    const [flippedCardsContent, setFlippedCardsContent] = useState<string[]>(
        []
    );
    const [isFinished, setIsfinished] = useState<boolean>(false);

    const startGame = (): void => {
        let array: CardType[];

        if (context && context.difficulty === "Easy")
            array = gameCards.slice(0, 8);
        else if (context && context.difficulty === "Medium")
            array = gameCards.slice(0, 12);
        else array = gameCards;

        const duplicatedArray: CardType[] = array.map((card) => ({
            id: card.id + array.length,
            hiddenElement: card.hiddenElement,
            isFlipped: false,
            isMatched: false,
        }));
        const shuffledArray: CardType[] = [...array, ...duplicatedArray].sort(
            () => Math.random() - 0.5
        );

        setGameCards(shuffledArray);
    };

    const flippedNotMatchedCards = async (
        arrayElements: CardType[]
    ): Promise<void> => {
        setTimeout(() => {
            setGameCards(
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
        const targetCard: CardType | undefined = gameCards.find(
            (element) => element.id === cardId
        );

        updatedArray = gameCards.map((card) =>
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

        setGameCards(updatedArray);

        if (flippedCardsNumber + 1 >= 2) {
            setFlippedCardsNumber(0);
            flippedNotMatchedCards(updatedArray);
        } else {
            setFlippedCardsNumber(flippedCardsNumber + 1);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (context) {
            console.log(context);

            setGameCards(gameCards.slice(0, 12));
            startGame();
        }
    }, []);

    useEffect(() => {
        const isCompleted: boolean = gameCards.every(
            (element) =>
                element.isMatched === true && element.isFlipped === true
        );
        if (isCompleted && !isFinished) {
            setIsfinished(true);
            const timeoutId: NodeJS.Timer = setInterval(() => {
                alert("¡HAS GANADO!");
                navigate("/");
                clearInterval(timeoutId);
            }, 1000);
        }
        // eslint-disable-next-line
    }, [gameCards]);

    return (
        <div className="game-container">
            {gameCards.map((element, index) => (
                <div key={index} className="card-container">
                    <Card
                        cardElement={element}
                        handleClick={(targetCard) => handleFlip(targetCard)}
                    />
                </div>
            ))}
        </div>
    );
}
