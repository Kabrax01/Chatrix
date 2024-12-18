import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.js";
import { useReducer, createContext, useEffect } from "react";
import {
    ChatContextProps,
    StateTypes,
    CounterAction,
} from "./chatContextTypes.js";

export const ChatContext = createContext<{
    state: StateTypes;
    dispatch: React.Dispatch<CounterAction>;
} | null>(null);

const initialState: StateTypes = {
    loading: false,
    registration: false,
    uid: "",
    user: null,
    isLoggedIn: false,
    activeChatUser: null,
    activeChat: null,
    chats: null,
    filteredChats: null,
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
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                uid: "",
                activeChat: null,
                activeChatUser: null,
            };
        }
        case "userDataReceived": {
            return { ...state, user: action.payload };
        }
        case "userAvatarChange": {
            if (state.user) {
                return {
                    ...state,
                    user: { ...state.user, avatar: action.payload },
                };
            }
            return state;
        }
        case "userNameChange": {
            if (state.user) {
                return {
                    ...state,
                    user: { ...state.user, userName: action.payload },
                };
            }
            return state;
        }
        case "activeChatSelect": {
            return {
                ...state,
                activeChatUser: action.payload.activeUser,
                activeChat: action.payload.activeChat,
                filteredChats: null,
            };
        }
        case "userChatsChange": {
            return {
                ...state,
                chats: action.payload,
            };
        }
        case "filterChats": {
            return {
                ...state,
                filteredChats: action.payload,
            };
        }
        default: {
            return state;
        }
    }
}

function ChatContextProvider({ children }: ChatContextProps) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const auth = getAuth();
    const { uid, registration, isLoggedIn } = state;

    useEffect(() => {
        if (registration || !isLoggedIn) return;
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
                    const { email, id: uid, userName, avatar } = docSnap.data();
                    dispatch({
                        type: "userDataReceived",
                        payload: { email, uid, userName, avatar },
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
        <ChatContext.Provider value={{ state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
}

export default ChatContextProvider;
