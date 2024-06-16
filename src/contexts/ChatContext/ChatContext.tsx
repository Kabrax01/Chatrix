import { ReactNode, createContext, useContext, useReducer } from "react";

type StateTypes = {
    loading: boolean;
    user: {
        uid: string;
    };
    isLoggedIn: boolean;
    dispatch: React.Dispatch<CounterAction>;
};

type ChatContextProps = {
    children: ReactNode;
};

type CounterAction =
    | { type: "loading" }
    | { type: "loadingEnd" }
    | { type: "loggedIn"; payload: string };

const ChatContext = createContext<StateTypes | null>(null);

const initialState = {
    loading: false,
    user: {},
    isLoggedIn: false,
};

function reducer(state: StateTypes, action: CounterAction) {
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
                user: (state.user = { uid: action.payload }),
            };
        }

        default: {
            return state;
        }
    }
}

function ChatContextProvider({ children }: ChatContextProps) {
    const [{ user, isLoggedIn, loading }, dispatch] = useReducer(
        reducer,
        initialState
    );

    return (
        <ChatContext.Provider
            value={{
                user,
                isLoggedIn,
                loading,
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
