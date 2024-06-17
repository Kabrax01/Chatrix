import { ReactNode, useReducer, createContext, useContext } from "react";

type ChatContextProps = {
    children: ReactNode;
};

type StateTypes = {
    loading: boolean;
    user: {
        uid?: string;
    };
    isLoggedIn: boolean;
};

type CounterAction =
    | { type: "loading" }
    | { type: "loadingEnd" }
    | { type: "loggedIn"; payload: string };

const ChatContext = createContext<{
    state: StateTypes;
    dispatch: React.Dispatch<CounterAction>;
} | null>(null);

const initialState: StateTypes = {
    loading: false,
    user: {},
    isLoggedIn: false,
};

function reducer(state: StateTypes, action: CounterAction): StateTypes {
    switch (action.type) {
        case "loading": {
            return { ...state, loading: true };
        }
        case "loadingEnd": {
            return { ...state, loading: false };
        }
        case "loggedIn": {
            return {
                ...state,
                isLoggedIn: true,
                user: { uid: action.payload },
            };
        }

        default: {
            return state;
        }
    }
}

function useChatContext() {
    const context = useContext(ChatContext);

    if (!context) throw new Error("ChatContext was used outside of provider");

    return context;
}

function ChatContextProvider({ children }: ChatContextProps) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const contextValue = { state, dispatch };

    return (
        <ChatContext.Provider value={contextValue}>
            {children}
        </ChatContext.Provider>
    );
}

// eslint-disable-next-line
export { useChatContext, ChatContextProvider };
