import { ReactNode, createContext, useContext, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextProps {
    children: ReactNode;
}

type ThemeContextType = {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

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

    if (!context) throw new Error("ThemeContext was used outside of provider");

    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { ThemeContextProvider, useThemeContext };
