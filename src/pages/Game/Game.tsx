import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDifficulty } from "../../context/Difficulty";
import { arrayGameCards } from "../../constants/arrayGameCards";
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
    const [gameCards, setGameCards] = useState<CardType[]>(arrayGameCards);
    const [isFinished, setIsfinished] = useState<boolean>(false);
    const [isWon, setIsWon] = useState<boolean>(false);
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
            setFlippedCardsContent([]);
        }, 500);
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
                    <div
                        key={index}
                        className={`card-container ${difficulty?.toLowerCase()}-game`}
                    >
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
