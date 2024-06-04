import { useState } from "react";
import "./app.scss";
import ThemeButton from "./components/ThemeButton/ThemeButton";
import Main from "./components/Main/Main";

function App() {
    const [theme, setTheme] = useState("dark");

    function handleSetTheme() {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    return (
        <Main theme={theme}>
            <div className="container">
                <ThemeButton handleSetTheme={handleSetTheme} />
            </div>
        </Main>
    );
}

export default App;
