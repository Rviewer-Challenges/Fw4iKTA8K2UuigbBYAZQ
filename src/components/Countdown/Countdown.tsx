import { useEffect, useState } from "react";
import Counter from "../Counter/Counter";
import CountdownIcon from "../CountdownIcon/CountdownIcon";
import "./Countdown.scss";

export default function Countdown(props: { timeIsOver: () => void }) {
    let time: number = 60;
    const [seconds, setSeconds] = useState<number>(time);

    useEffect(() => {
        const intervalId = setInterval(() => {
            time--;
            setSeconds(time);
            if (time <= 0) {
                clearInterval(intervalId);
                props.timeIsOver();
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="countdown-icon">
                <CountdownIcon seconds={seconds} />
            </div>
            <Counter
                title="Time"
                text={seconds >= 10 ? seconds.toString() : `0${seconds}`}
            />
        </>
    );
}
