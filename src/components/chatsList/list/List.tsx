import "./list.scss";
import ChatListItem from "./chatListItem/ChatListItem.js";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase.js";
import useChatContext from "../../../contexts/chatContext/useChatContext.js";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "../../logo/Logo.tsx";
import Loading from "../../loading/Loading.tsx";

function List() {
    const [loading, setIsLoading] = useState(true);
    const { state, dispatch } = useChatContext();
    const { uid, chats, filteredChats } = state;

    useEffect(() => {
        setIsLoading(true);
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
                        return { ...item, user };
                    });
                }

                const chatData = await Promise.all(promises);
                if (!chatData) throw new Error("Something went wrong");

                const sortedChats = chatData.sort(
                    (a, b) => b.updatedAt - a.updatedAt
                );

                dispatch({ type: "userChatsChange", payload: sortedChats });
            } catch (error) {
                console.error(`${(error as Error).message}`);
            } finally {
                setIsLoading(false);
            }
        });

        return () => unSub();
    }, [uid, dispatch]);

    if (loading)
        return (
            <Loading width={25} height={50} unit={"px"} text={"Loading..."} />
        );

    return (
        <>
            {!!chats?.length && (
                <motion.div
                    className="list"
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.5 } }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}>
                    {filteredChats?.length ? (
                        <ul>
                            {filteredChats.map((chat) => (
                                <ChatListItem
                                    user={chat.user}
                                    chat={chat}
                                    key={chat.chatId}
                                />
                            ))}
                        </ul>
                    ) : (
                        <ul>
                            {chats?.map((chat) => (
                                <ChatListItem
                                    user={chat.user}
                                    chat={chat}
                                    key={chat.chatId}
                                />
                            ))}
                        </ul>
                    )}
                </motion.div>
            )}
            {!chats?.length && <Logo className="logo__mobile" />}
        </>
    );
}

export default List;
