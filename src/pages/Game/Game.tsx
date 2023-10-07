import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDifficulty } from "../../context/Difficulty";
import "./Game.scss";
import Card from "../../components/Card/Card";
import CardType from "../../types/CardType";
import Counter from "../../components/Counter/Counter";
import Countdown from "../../components/Countdown/Countdown";
import GameOver from "../../components/GameOver/GameOver";

export default function Game() {
    const navigate = useNavigate();
    const { difficulty } = useDifficulty();
    const [movements, setMovements] = useState<number>(0);
    const [isFinished, setIsfinished] = useState<boolean>(false);
    const [isWon, setIsWon] = useState<boolean>(false);

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

    const startGame = (): void => {
        let array: CardType[];

        if (difficulty === "Easy") array = gameCards.slice(0, 8);
        else if (difficulty === "Medium") array = gameCards.slice(0, 12);
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
            setMovements(movements + 1);
            setFlippedCardsNumber(0);
            flippedNotMatchedCards(updatedArray);
        } else {
            setFlippedCardsNumber(flippedCardsNumber + 1);
        }
    };

    useEffect(() => {
        if (!difficulty) navigate("/");
        startGame();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const isCompleted: boolean = gameCards.every(
            (element) =>
                element.isMatched === true && element.isFlipped === true
        );
        if (isCompleted && !isFinished) {
            setIsWon(true);
            setIsfinished(true);
        }
        // eslint-disable-next-line
    }, [gameCards]);

    return isFinished ? (
        <GameOver isWon={isWon} movements={movements} />
    ) : (
        <div className="game-container">
            <div className="counters-container">
                <Counter title="Movements" text={movements.toString()} />
                <Countdown timeIsOver={() => setIsfinished(true)} />
            </div>
            <div className="cards-container">
                {gameCards.map((element, index) => (
                    <div key={index} className="card-container">
                        <Card
                            cardElement={element}
                            handleClick={(targetCard) => handleFlip(targetCard)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
