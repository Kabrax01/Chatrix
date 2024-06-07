import { ReactNode, createContext, useContext, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextProps {
    children: ReactNode;
}

interface ThemeContextType {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function ThemeContextProvider({ children }: ThemeContextProps) {
    const [theme, setTheme] = useState<Theme>("dark");

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

function useThemeContext() {
    const context = useContext(ThemeContext);

    if (context === undefined) throw new Error("No context");

    return context;
}

export { ThemeContextProvider, useThemeContext };
