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
import { useState } from "react";

function App() {
    const [formType, setFormType] = useState("register");
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
                                    <div className="form__switch">
                                        <button
                                            style={{
                                                background: `${
                                                    formType === "login"
                                                        ? "hsl(226, 66%, 70%)"
                                                        : "transparent"
                                                }`,
                                            }}
                                            onClick={() =>
                                                setFormType("login")
                                            }>
                                            Log in
                                        </button>
                                        <button
                                            style={{
                                                background: `${
                                                    formType === "register"
                                                        ? "hsl(226, 66%, 70%)"
                                                        : "transparent"
                                                }`,
                                            }}
                                            onClick={() =>
                                                setFormType("register")
                                            }>
                                            Register
                                        </button>
                                    </div>
                                    {formType === "login" ? (
                                        <LoginForm />
                                    ) : (
                                        <RegisterForm />
                                    )}
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
