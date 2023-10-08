import Body from "./pages/Routes";
import { DifficultyProvider } from "./context/Difficulty";

function App() {
    return (
        <DifficultyProvider>
            <Body />
        </DifficultyProvider>
    );
}

export default App;
