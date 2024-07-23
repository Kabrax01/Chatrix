import "./chatsList.scss";
import { createContext, useState } from "react";
import User from "./currentUser/CurrentUser.js";
import SearchChat from "./searchChat/SearchChat.js";
import List from "./list/List.js";
import { ListContextProps } from "./types.ts";

import AddUser from "./addUser/AddUser.tsx";
import EditCurrentUser from "./editCurrentUser/EditCurrentUser.tsx";

export const ListContext = createContext<ListContextProps | null>(null);

function ChatsList() {
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [isOpenCurrentUserEdit, setIsOpenCurrentUserEdit] = useState(false);
    const contextValue = {
        isOpenSearch,
        setIsOpenSearch,
        setIsOpenCurrentUserEdit,
    };

    return (
        <section className="chat__list">
            <ListContext.Provider value={contextValue}>
                <User />
                <SearchChat />
                {isOpenCurrentUserEdit ? <EditCurrentUser /> : <List />}
                {isOpenSearch && <AddUser />}
            </ListContext.Provider>
        </section>
    );
}

export default ChatsList;
