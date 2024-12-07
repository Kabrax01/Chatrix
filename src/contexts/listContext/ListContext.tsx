import { createContext, useState } from "react";
import { ListProviderProps, ListContextTypes } from "./types";

export const ListContext = createContext<ListContextTypes | null>(null);

function ListContextProvider({ children }: ListProviderProps) {
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [isOpenCurrentUserEdit, setIsOpenCurrentUserEdit] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const contextValue = {
        isOpenSearch,
        setIsOpenSearch,
        setIsOpenCurrentUserEdit,
        isOpenCurrentUserEdit,
        isMenuOpen,
        setIsMenuOpen,
    };

    return (
        <ListContext.Provider value={contextValue}>
            {children}
        </ListContext.Provider>
    );
}

export default ListContextProvider;
