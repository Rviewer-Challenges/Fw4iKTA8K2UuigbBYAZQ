import { useNavigate } from "react-router-dom";
import "./GameOver.scss";

export default function GameOver(props: { isWon: boolean; movements: number }) {
    const navigate = useNavigate();
    return (
        <div className="gameover-container">
            <p className="final-title">
                {props.isWon ? "Good job!" : "You lose!"}
            </p>

            <div className="image-container">
                <img
                    src={
                        props.isWon
                            ? require(`../../resources/imgs/victory.png`)
                            : require("../../resources/imgs/defeat.png")
                    }
                    alt={props.isWon ? "victory" : "defeat"}
                    style={{
                        width: props.isWon ? "250px" : "50%",
                        margin: props.isWon ? -10 : 10,
                    }}
                />
            </div>
            <p className="final-text">Number of movements: {props.movements}</p>
            <button className="final-button" onClick={() => navigate("/")}>
                <p className="text">
                    {props.isWon ? "Back to main page" : "Try again"}
                </p>
            </button>
        </div>
    );
}
