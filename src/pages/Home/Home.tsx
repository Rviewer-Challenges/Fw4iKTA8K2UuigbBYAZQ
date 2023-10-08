import { useNavigate } from "react-router-dom";
import { useDifficulty } from "../../context/Difficulty";
import "./Home.scss";

export default function Home() {
    const navigate = useNavigate();
    const { setDifficulty } = useDifficulty();
    const handleClick = (e: any): void => {
        const difficulty = e.target.textContent.split(" ")[0];
        setDifficulty(difficulty);
        navigate("/game");
    };

    return (
        <div className="home">
            <div className="container">
                <p className="title">Memory Game</p>

                <p className="subtitle">Select the difficulty:</p>
                <div className="buttons-container">
                    <button className="main-button" onClick={handleClick}>
                        <p className="text easy">Easy game</p>
                    </button>
                    <button className="main-button" onClick={handleClick}>
                        <p className="text medium">Medium game</p>
                    </button>
                    <button className="main-button" onClick={handleClick}>
                        <p className="text difficult">Difficult game</p>
                    </button>
                </div>

                <div className="credits">
                    <p>
                        By{" "}
                        <a
                            href="https://www.linkedin.com/in/ruben-palomo-fontan/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link"
                        >
                            Rubén Palomo
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
