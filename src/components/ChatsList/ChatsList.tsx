import "./chatsList.scss";
import { createContext, useEffect, useState } from "react";
import User from "../user/User.js";
import SearchChat from "../searchChat/SearchChat.js";
import List from "../list/List.js";
import { ChatsType, ListContextProps } from "./types.ts";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase.js";
import { useChatContext } from "../../contexts/chatContext/ChatContext.js";
import AddUser from "../addUser/AddUser.tsx";

export const ListContext = createContext<ListContextProps | null>(null);

function ChatsList() {
    const [chats, setChats] = useState<undefined | ChatsType>();
    const [isOpenSearch, setIsOpenSearch] = useState(false);

    const { state } = useChatContext();
    const { uid } = state;

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userchats", uid), (doc) => {
            setChats(doc.data() as ChatsType);
            console.log(doc.data()?.chats);
        });

        return () => unSub();
    }, [uid]);

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
