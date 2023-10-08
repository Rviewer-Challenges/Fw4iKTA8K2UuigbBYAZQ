import { createContext, useContext, useState } from "react";

type DifficultyContextType = {
    difficulty: "Easy" | "Medium" | "Difficult" | undefined;
    setDifficulty: (newDifficulty: "Easy" | "Medium" | "Difficult") => void;
};

const DifficultyContext = createContext<DifficultyContextType | undefined>(
    undefined
);

export const DifficultyProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [difficulty, setDifficulty] = useState<
        "Easy" | "Medium" | "Difficult"
    >();

    return (
        <DifficultyContext.Provider value={{ difficulty, setDifficulty }}>
            {children}
        </DifficultyContext.Provider>
    );
};

export const useDifficulty = (): DifficultyContextType => {
    const context = useContext(DifficultyContext);

    if (!context) {
        throw new Error();
    }

    return context;
};
