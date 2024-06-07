import "./app.scss";
import Main from "./components/Main/Main";
import ChatsList from "./components/ChatsList/ChatsList";
import ChatMain from "./components/ChatMain/ChatMain";
import ChatCurrent from "./components/ChatCurrent/ChatCurrent";
import { ThemeContextProvider } from "./contexts/ThemeContext/ThemeContext";

function App() {
    return (
        <ThemeContextProvider>
            <Main>
                <div className="container">
                    <ChatsList />
                    <ChatMain />
                    <ChatCurrent />
                </div>
            </Main>
        </ThemeContextProvider>
    );
}

export default App;
