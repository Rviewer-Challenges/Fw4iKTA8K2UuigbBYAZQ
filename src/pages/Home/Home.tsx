import { useNavigate } from "react-router-dom";
import "./Home.scss";

export default function Home() {
    const navigate = useNavigate();
    const handleClick = (): void => navigate("/game");

    return (
        <div className="home-container">
            <button onClick={handleClick}>
                <p>Click me!</p>
            </button>
        </div>
    );
}
