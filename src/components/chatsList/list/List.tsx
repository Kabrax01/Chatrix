import "./list.scss";
import ChatListItem from "./chatListItem/ChatListItem.js";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase.js";
import { useChatContext } from "../../../contexts/temp/chatContext/ChatContext.js";
import { ChatsType } from "../types.js";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function List() {
    const [chats, setChats] = useState<undefined | ChatsType[]>();

    const { state } = useChatContext();
    const { uid } = state;

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userchats", uid), async (res) => {
            try {
                if (!res.data()) throw new Error("Something went wrong");
                const items = res.data()?.chats;

                let promises;

                if (items) {
                    promises = items.map(async (item) => {
                        const userDocRef = doc(db, "users", item.receiverId);
                        const userDocSnap = await getDoc(userDocRef);

                        const user = userDocSnap.data();
                        return { ...items, user };
                    });
                }

                const chatData = await Promise.all(promises);
                if (!chatData) throw new Error("Something went wrong");

                setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
            } catch (error) {
                console.error(`${(error as Error).message}`);
            }
        });

        return () => unSub();
    }, [uid]);

    return (
        <motion.div
            className="list"
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}>
            <ul>
                {chats &&
                    chats.map((chat, i) => (
                        <ChatListItem
                            user={chat.user}
                            chat={chat[i]}
                            key={chat[i].chatId}
                        />
                    ))}
            </ul>
        </motion.div>
    );
}

export default List;
