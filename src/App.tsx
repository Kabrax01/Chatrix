import "./app.scss";
import ChatsList from "./components/ChatsList/ChatsList";
import ChatMain from "./components/ChatMain/ChatMain";
import ChatCurrent from "./components/ChatCurrent/ChatCurrent";
import { ThemeContextProvider } from "./contexts/ThemeContext/ThemeContext";
import MainChatView from "./components/MainChatView/MainChatView";
import { useState } from "react";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import ThemeButton from "./components/ThemeButton/ThemeButton";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return (
        <ThemeContextProvider>
            <ThemeButton />
            <MainChatView>
                {isLoggedIn ? (
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
            :
        </ThemeContextProvider>
    );
}

export default App;
