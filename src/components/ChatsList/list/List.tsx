import "./list.scss";
import ChatListItem from "./chatListItem/ChatListItem.js";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase.js";
import { useChatContext } from "../../../contexts/chatContext/ChatContext.js";
import { ChatsType } from "../types.js";
import { useEffect, useState } from "react";

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
        <div className="list">
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
        </div>
    );
}

export default List;
