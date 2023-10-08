import "./Counter.scss";

export default function Counter(props: { title: string; text: string }) {
    return (
        <div className="counter">
            <div className="container">
                <div className="text-container">
                    <p className="title">{props.title}:</p>
                </div>
                <div className="text-container centered">
                    <p className="text">{props.text}</p>
                </div>
            </div>
        </div>
    );
}
