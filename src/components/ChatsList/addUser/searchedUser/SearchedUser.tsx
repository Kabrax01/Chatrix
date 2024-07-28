import "./searchedUser.scss";
import { User } from "../../types.js";
import { db } from "../../../../firebase/firebase.js";
import {
    arrayUnion,
    collection,
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { useChatContext } from "../../../../contexts/chatContext/ChatContext.js";
import { useState } from "react";

interface UserProps {
    user: User;
}

function SearchedUser({ user }: UserProps) {
    const [chatId, setChatId] = useState<string | null>(null);
    const { state } = useChatContext();
    const { user: currentUser } = state;

    async function handleAddUser() {
        const chatRef = collection(db, "chats");
        const userChatsRef = collection(db, "userchats");

        try {
            const newChatRef = doc(chatRef);
            setChatId(newChatRef.id);

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });

            if (currentUser) {
                if (chatId) {
                    const userChatDocRef = doc(
                        db,
                        `userchats/${currentUser.uid}`
                    );
                    const userChatDoc = await getDoc(userChatDocRef);
                    const userChatData = userChatDoc.data();
                    const chats = userChatData?.chats || [];

                    const currentUserChatsArray: string[] = [];

                    chats.forEach((chat) =>
                        currentUserChatsArray.push(chat.receiverId)
                    );

                    const checkIfChatAlreadyExists =
                        currentUserChatsArray.includes(user.id);

                    if (checkIfChatAlreadyExists) return;
                }

                await updateDoc(doc(userChatsRef, user.id), {
                    chats: arrayUnion({
                        chatId: newChatRef.id,
                        lastMessage: "",
                        receiverId: currentUser.uid,
                        updatedAt: Date.now(),
                    }),
                });

                await updateDoc(doc(userChatsRef, currentUser.uid), {
                    chats: arrayUnion({
                        chatId: newChatRef.id,
                        lastMessage: "",
                        receiverId: user.id,
                        updatedAt: Date.now(),
                    }),
                });
            }
        } catch (error) {
            console.error(`${(error as Error).message}`);
        }
    }

    return (
        <div className="search__user">
            <div className="search__user__credentials">
                <img
                    src={user.avatar ? user.avatar : "avatar.png"}
                    alt="User picture"
                />
                <div>
                    <p>{user.userName}</p>
                    <p>{user.email}</p>
                </div>
            </div>
            <button onClick={handleAddUser}>Add user</button>
        </div>
    );
}

export default SearchedUser;
