import "./app.scss";
import ChatsList from "./components/chatsList/ChatsList";
import ChatMain from "./components/chatMain/ChatMain";
import ChatCurrent from "./components/chatDetails/ChatDetails";
import MainChatView from "./components/mainChatView/MainChatView";
import LoginForm from "./components/loginForm/LoginForm";
import RegisterForm from "./components/registerForm/RegisterForm";

import { ThemeContextProvider } from "./contexts/themeContext/ThemeContext";
import { useChatContext } from "./contexts/chatContext/ChatContext";
import Loading from "./components/loading/Loading";

function App() {
    const { state } = useChatContext();

    const { loading, isLoggedIn } = state;

    return (
        <ThemeContextProvider>
            <MainChatView>
                <div className="main_container">
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
            </MainChatView>
        </ThemeContextProvider>
    );
}

export default App;
