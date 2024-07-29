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
import { ListContextProvider } from "./contexts/listContext/ListContext";

function App() {
    const { state } = useChatContext();

    const { loading, isLoggedIn } = state;

    return (
        <ThemeContextProvider>
            <MainChatView>
                <div className="main_container">
                    {loading ? (
                        <Loading
                            width={25}
                            height={50}
                            unit={"px"}
                            text={"Loading..."}
                        />
                    ) : (
                        <>
                            {isLoggedIn ? (
                                <ListContextProvider>
                                    <div className="chat__container">
                                        <ChatsList />
                                        <ChatMain />
                                        <ChatCurrent />
                                    </div>
                                </ListContextProvider>
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
