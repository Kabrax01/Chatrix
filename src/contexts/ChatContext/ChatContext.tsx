import { ReactNode, createContext, useReducer } from "react";

type StateTypes = {
      user: string | null,
      isLoggedIn: boolean,
}

type ChatContextProps = {
      children: ReactNode
}

const ChatContext = createContext(null);


const initialState: StateTypes = {
    user: null,
    isLoggedIn: false
};

function reducer(state, action) {
      switch(action.type) {
            case "loggedIn": {
                  return {...state, isLoggedIn: true}
            };
            default: {
                  return {...state}
            }
      }
}

function ChatContextProvider({ children }): ChatContextProps {
    const [{ user, isLoggedIn }, dispatch] = useReducer(reducer, initialState);

    return (
        <ChatContext.Provider value: StateTypes={{user, isLoggedIn}}>{children}</ChatContext.Provider>
    );
}
