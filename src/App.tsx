import { useState } from "react";
import "./app.scss";
// import ThemeButton from "./components/ThemeButton/ThemeButton";
import Main from "./components/Main/Main";
import ChatsList from "./components/ChatsList/ChatsList";
import ChatMain from "./components/ChatMain/ChatMain";
import ChatCurrent from "./components/ChatCurrent/ChatCurrent";

function App() {
    const [theme, setTheme] = useState<string>("dark");

    // function handleSetTheme() {
    //     setTheme(theme === "dark" ? "light" : "dark");
    // }

    return (
        <Main theme={theme}>
            <div className="container">
                <ChatsList />
                <ChatMain />
                <ChatCurrent />
                {/* <ThemeButton handleSetTheme={handleSetTheme} /> */}
            </div>
        </Main>
    );
}

export default App;
