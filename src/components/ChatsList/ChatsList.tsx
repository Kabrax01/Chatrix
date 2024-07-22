import "./chatsList.scss";
import { createContext, useState } from "react";
import User from "./currentUser/CurrentUser.js";
import SearchChat from "./searchChat/SearchChat.js";
import List from "./list/List.js";
import { ListContextProps } from "./types.ts";

import AddUser from "./addUser/AddUser.tsx";

export const ListContext = createContext<ListContextProps | null>(null);

function ChatsList() {
    const [isOpenSearch, setIsOpenSearch] = useState(false);

    return (
        <section className="chat__list">
            <ListContext.Provider value={{ isOpenSearch, setIsOpenSearch }}>
                <User />
                <SearchChat />
                <List />
                {isOpenSearch && <AddUser />}
            </ListContext.Provider>
        </section>
    );
}

export default ChatsList;
