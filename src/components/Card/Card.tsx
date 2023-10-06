import "./Card.scss";
import CardProps from "./CardProps";

export default function Card(props: CardProps) {
    const handleClick = (e: any): void =>
        props.handleClick(parseInt(e.target.id));

    return (
        <button
            id={props.cardElement.id.toString()}
            className={"card"}
            onClick={!props.cardElement.isFlipped ? handleClick : () => {}}
        >
            <img
                src={
                    props.cardElement.isFlipped
                        ? require(`../../resources/imgs/${props.cardElement.hiddenElement}.png`)
                        : require("../../resources/imgs/react-logo.png")
                }
                alt={props.cardElement.id.toString()}
                style={{ width: 50, margin: 0 }}
            />
        </button>
    );
}
