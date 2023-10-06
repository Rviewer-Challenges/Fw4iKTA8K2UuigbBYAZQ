import { useNavigate } from "react-router-dom";
import "./Home.scss";

export default function Home() {
    const navigate = useNavigate();
    const handleClick = (): void => navigate("/game");

    return (
        <div className="home">
            <div className="container">
                <p className="title">Memory Game</p>
                <button className="main-button" onClick={handleClick}>
                    <p className="text">Click me!</p>
                </button>
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
