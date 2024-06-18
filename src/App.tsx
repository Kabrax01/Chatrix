import "./app.scss";
import ChatsList from "./components/ChatsList/ChatsList";
import ChatMain from "./components/ChatMain/ChatMain";
import ChatCurrent from "./components/ChatCurrent/ChatCurrent";
import MainChatView from "./components/MainChatView/MainChatView";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import ThemeButton from "./components/ThemeButton/ThemeButton";

import { ThemeContextProvider } from "./contexts/ThemeContext/ThemeContext";
import { useChatContext } from "./contexts/ChatContext/ChatContext";

function App() {
    const { state } = useChatContext();

    return (
        <ThemeContextProvider>
            <ThemeButton />
            <MainChatView>
                {state.isLoggedIn ? (
                    <div className="chat__container">
                        <ChatsList />
                        <ChatMain />
                        <ChatCurrent />
                    </div>
                ) : (
                    <div className="login__container">
                        <LoginForm />
                        <RegisterForm />
                    </div>
                )}
            </MainChatView>
        </ThemeContextProvider>
    );
}

export default App;
