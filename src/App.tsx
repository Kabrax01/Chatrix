import "./app.scss";
import ChatsList from "./components/ChatsList/ChatsList";
import ChatMain from "./components/ChatMain/ChatMain";
import ChatCurrent from "./components/ChatDetails/ChatDetails";
import MainChatView from "./components/MainChatView/MainChatView";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";

import { ThemeContextProvider } from "./contexts/ThemeContext/ThemeContext";
import { useChatContext } from "./contexts/ChatContext/ChatContext";
import Loading from "./components/Loading/Loading";

function App() {
    const { state } = useChatContext();

    const { loading } = state;

    return (
        <ThemeContextProvider>
            <MainChatView>
                <div className="main_container">
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
            </MainChatView>
        </ThemeContextProvider>
    );
}

export default App;
