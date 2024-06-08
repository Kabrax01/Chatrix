import "./app.scss";
import ChatsList from "./components/ChatsList/ChatsList";
import ChatMain from "./components/ChatMain/ChatMain";
import ChatCurrent from "./components/ChatCurrent/ChatCurrent";
import { ThemeContextProvider } from "./contexts/ThemeContext/ThemeContext";
import MainView from "./components/MainView/MainView";

function App() {
    return (
        <ThemeContextProvider>
            <MainView>
                <div className="container">
                    <ChatsList />
                    <ChatMain />
                    <ChatCurrent />
                </div>
            </MainView>
        </ThemeContextProvider>
    );
}

export default App;
