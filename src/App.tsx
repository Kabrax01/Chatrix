import "./app.scss";
import ChatsList from "./components/chatsList/ChatsList";
import ChatMain from "./components/chatMain/ChatMain";
import MainChatView from "./components/mainChatView/MainChatView";
import LoginForm from "./components/loginForm/LoginForm";
import RegisterForm from "./components/registerForm/RegisterForm";
import { ThemeContextProvider } from "./contexts/themeContext/ThemeContext";
import { useChatContext } from "./contexts/chatContext/ChatContext";
import Loading from "./components/loading/Loading";
import { ListContextProvider } from "./contexts/listContext/ListContext";
import { useState } from "react";
import SwitchForm from "./components/switchForm/SwitchForm";
import Logo from "./components/logo/Logo";

export type FormTypes = "Login" | "Register";

function App() {
    const [formType, setFormType] = useState<FormTypes>("Register");
    const { state } = useChatContext();

    const { loading, isLoggedIn, activeChat } = state;

    return (
        <ThemeContextProvider>
            <ListContextProvider>
                <MainChatView>
                    <div className="main_container">
                        {loading && (
                            <Loading
                                width={25}
                                height={50}
                                unit={"px"}
                                text={"Loading..."}
                            />
                        )}
                        {isLoggedIn && (
                            <div className="chat__container">
                                <ChatsList />
                                {activeChat === null ? <Logo /> : <ChatMain />}
                            </div>
                        )}
                        {!isLoggedIn && (
                            <div className="login__container">
                                <Logo text={""} />

                                <SwitchForm
                                    setFormType={setFormType}
                                    formType={formType}
                                />
                                {formType === "Login" ? (
                                    <LoginForm />
                                ) : (
                                    <RegisterForm />
                                )}
                            </div>
                        )}
                    </div>
                </MainChatView>
            </ListContextProvider>
        </ThemeContextProvider>
    );
}

export default App;
