import "./searchedUser.scss";
import { User } from "../../types.js";
import { db } from "../../../../firebase/firebase.js";
import {
    arrayUnion,
    collection,
    doc,
    serverTimestamp,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { useChatContext } from "../../../../contexts/chatContext/ChatContext.js";
import { useRef } from "react";
import getChatsArray from "../../../../firebase/getChatsArray.js";
import { useListContext } from "../../../../contexts/temp/listContext/ListContext.js";

interface UserProps {
    user: User;
}

function SearchedUser({ user }: UserProps) {
    const chatIdRef = useRef<string | null>(null);
    const { state } = useChatContext();
    const { user: currentUser } = state;
    const { setIsOpenSearch } = useListContext();

    async function handleAddUser() {
        try {
            const chatRef = collection(db, "chats");
            const userChatsRef = collection(db, "userchats");
            const newChatRef = doc(chatRef);
            chatIdRef.current = newChatRef.id;

            if (currentUser) {
                if (!chatIdRef) return;
                const userChatData = await getChatsArray(currentUser.uid);

                const chats = userChatData?.chats || [];

                const currentUserChatsArray: string[] = chats.map(
                    (chat) => chat.receiverId
                );

                const checkIfChatAlreadyExists = currentUserChatsArray.includes(
                    user.id
                );

                if (checkIfChatAlreadyExists) return;

                await setDoc(newChatRef, {
                    createdAt: serverTimestamp(),
                    messages: [],
                });

                await updateDoc(doc(userChatsRef, user.id), {
                    chats: arrayUnion({
                        chatId: newChatRef.id,
                        lastMessage: "",
                        receiverId: currentUser.uid,
                        updatedAt: Date.now(),
                        hasBeenOpened: true,
                    }),
                });

                await updateDoc(doc(userChatsRef, currentUser.uid), {
                    chats: arrayUnion({
                        chatId: newChatRef.id,
                        lastMessage: "",
                        receiverId: user.id,
                        updatedAt: Date.now(),
                        hasBeenOpened: true,
                    }),
                });

                setIsOpenSearch((prev) => !prev);
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
