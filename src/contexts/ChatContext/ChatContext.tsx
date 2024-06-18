import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.js";
import {
    ReactNode,
    useReducer,
    createContext,
    useContext,
    useEffect,
} from "react";

type ChatContextProps = {
    children: ReactNode;
};

type StateTypes = {
    loading: boolean;
    uid: string;
    user: {
        uid?: string;
    };
    isLoggedIn: boolean;
};

type CounterAction =
    | { type: "loading" }
    | { type: "loadingEnd" }
    | { type: "loggedIn"; payload: string }
    | { type: "loggedOut" };

const ChatContext = createContext<{
    state: StateTypes;
    dispatch: React.Dispatch<CounterAction>;
} | null>(null);

const initialState: StateTypes = {
    loading: false,
    uid: "",
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
                uid: action.payload,
            };
        }
        case "loggedOut": {
            return { ...state, isLoggedIn: false, user: {} };
        }

        default: {
            return state;
        }
    }
}

function ChatContextProvider({ children }: ChatContextProps) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const contextValue = { state, dispatch };
    const auth = getAuth();
    const { uid } = state;

    onAuthStateChanged(auth, (user) => {
        dispatch({ type: "loading" });
        if (user) {
            const uid = user.uid;
            dispatch({ type: "loggedIn", payload: uid });
        } else {
            dispatch({ type: "loggedOut" });
        }
        dispatch({ type: "loadingEnd" });
    });

    useEffect(() => {
        async function getUserData() {
            dispatch({ type: "loading" });
            try {
                const docRef = doc(db, "users", uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists())
                    console.log("Document data:", docSnap.data());
            } catch (error) {
                console.error(`${(error as Error).message}`);
            } finally {
                dispatch({ type: "loadingEnd" });
            }
        }

        getUserData();
    }, [uid]);

    return (
        <ChatContext.Provider value={contextValue}>
            {children}
        </ChatContext.Provider>
    );
}

function useChatContext() {
    const context = useContext(ChatContext);

    if (!context) throw new Error("ChatContext was used outside of provider");

    return context;
}

// eslint-disable-next-line
export { useChatContext, ChatContextProvider };
