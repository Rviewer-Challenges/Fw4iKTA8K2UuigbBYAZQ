import {
    BsHourglassTop,
    BsHourglassSplit,
    BsHourglassBottom,
} from "react-icons/bs";

export default function CountdownIcon(props: { seconds: number }) {
    if (props.seconds % 3 === 0) return <BsHourglassTop />;
    else if ((props.seconds + 1) % 3 === 0) return <BsHourglassSplit />;
    else return <BsHourglassBottom />;
}
