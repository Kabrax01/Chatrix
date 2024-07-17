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
    registration: boolean;
    uid: string;
    user: null | UserObject;
    isLoggedIn: boolean;
};

type UserObject = {
    email: string;
    uid: string;
    userName: string;
};

type CounterAction =
    | { type: "loading" }
    | { type: "loadingEnd" }
    | { type: "registered"; payload: boolean }
    | { type: "loggedIn"; payload: string }
    | { type: "loggedOut" }
    | {
          type: "userDataReceived";
          payload: UserObject;
      };

const ChatContext = createContext<{
    state: StateTypes;
    dispatch: React.Dispatch<CounterAction>;
} | null>(null);

const initialState: StateTypes = {
    loading: false,
    registration: false,
    uid: "",
    user: null,
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
        case "registered": {
            return { ...state, registration: action.payload };
        }
        case "loggedIn": {
            return {
                ...state,
                isLoggedIn: true,
                uid: action.payload,
            };
        }
        case "loggedOut": {
            return { ...state, isLoggedIn: false, user: null, uid: "" };
        }
        case "userDataReceived": {
            return { ...state, user: action.payload };
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
    const { uid, registration } = state;

    useEffect(() => {
        if (registration) return;
        dispatch({ type: "loading" });
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                dispatch({ type: "loggedIn", payload: uid });
            } else {
                dispatch({ type: "loggedOut" });
            }
            dispatch({ type: "loadingEnd" });
        });

        return () => unsubscribe();
    }, [auth, registration]);

    useEffect(() => {
        async function getUserData() {
            dispatch({ type: "loading" });
            try {
                const docRef = doc(db, `users`, `${uid}`);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const { email, id: uid, userName } = docSnap.data();
                    dispatch({
                        type: "userDataReceived",
                        payload: { email, uid, userName },
                    });
                } else {
                    throw new Error("no document data");
                }
            } catch (error) {
                console.error(`${(error as Error).message}`);
            } finally {
                dispatch({ type: "loadingEnd" });
            }
        }

        if (uid) getUserData();
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
