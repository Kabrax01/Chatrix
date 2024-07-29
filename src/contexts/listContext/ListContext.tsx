import { createContext, useContext, useState } from "react";
import { ListProviderProps, ListContextTypes } from "./types";

const ListContext = createContext<ListContextTypes | null>(null);

function ListContextProvider({ children }: ListProviderProps) {
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [isOpenCurrentUserEdit, setIsOpenCurrentUserEdit] = useState(false);

    const contextValue: ListContextTypes = {
        isOpenSearch,
        setIsOpenSearch,
        setIsOpenCurrentUserEdit,
        isOpenCurrentUserEdit,
    };

    return (
        <ListContext.Provider value={contextValue}>
            {children}
        </ListContext.Provider>
    );
}

function useListContext() {
    const context = useContext(ListContext);

    if (!context)
        throw new Error("Context was used outside of ListContext.Provider");

    return context;
}

// eslint-disable-next-line
export { ListContextProvider, useListContext };
