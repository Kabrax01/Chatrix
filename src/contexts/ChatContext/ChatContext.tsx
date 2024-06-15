import { ReactNode, createContext, useContext, useReducer } from "react";

type StateTypes = {
    user: string | null;
    isLoggedIn: boolean;
    dispatch: React.Dispatch<CounterAction>;
};

type ChatContextProps = {
    children: ReactNode;
};

type CounterAction = { type: "loggedIn" };

const ChatContext = createContext<StateTypes | null>(null);

const initialState = {
    user: null,
    isLoggedIn: false,
};

function reducer(state: StateTypes, action: CounterAction) {
    switch (action.type) {
        case "loggedIn": {
            return { ...state, isLoggedIn: true };
        }
        default: {
            return state;
        }
    }
}

function ChatContextProvider({ children }: ChatContextProps) {
    const [{ user, isLoggedIn }, dispatch] = useReducer(reducer, initialState);

    return (
        <ChatContext.Provider
            value={{
                user,
                isLoggedIn,
                dispatch,
            }}>
            {children}
        </ChatContext.Provider>
    );
}

function useChatContext() {
    const context = useContext(ChatContext);

    if (!context) throw new Error("ChatContext was used outside of provider");

    return context;
}

export { ChatContextProvider, useChatContext };
