import "./chatsList.scss";
import { createContext, useEffect, useState } from "react";
import User from "../User/User";
import SearchChat from "../SearchChat/SearchChat";
import List from "../List/List";
import { ChatsType, ListContextProps } from "./types.js";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase.js";
import { useChatContext } from "../../contexts/ChatContext/ChatContext";
import AddUser from "../AddUser/AddUser.js";

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
