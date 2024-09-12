import "./app.scss";
import ChatsList from "./components/temp/chatsList/ChatsList";
import ChatMain from "./components/temp/chatMain/ChatMain";
import MainChatView from "./components/temp/mainChatView/MainChatView";
import LoginForm from "./components/temp/loginForm/LoginForm";
import RegisterForm from "./components/temp/registerForm/RegisterForm";
import { ThemeContextProvider } from "./contexts/themeContext/ThemeContext";
import { useChatContext } from "./contexts/chatContext/ChatContext";
import Loading from "./components/temp/loading/Loading";
import { ListContextProvider } from "./contexts/listContext/ListContext";
import { useState } from "react";
import SwitchForm from "./components/temp/switchForm/SwitchForm";
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
                                {activeChat === null ? (
                                    <Logo
                                        header={"Welcome to Chatrix"}
                                        text={
                                            "Add new user or select chat from your list"
                                        }
                                    />
                                ) : (
                                    <ChatMain />
                                )}
                            </div>
                        )}
                        {isLoggedIn || (
                            <div className="login__container">
                                <Logo header="Chatrix" />
                                <img
                                    className="logo--small"
                                    src="./logo-small.svg"
                                    alt=""
                                />
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
