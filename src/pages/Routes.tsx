import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./Home/Home";
import Game from "./Game/Game";

export default function Body() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}
