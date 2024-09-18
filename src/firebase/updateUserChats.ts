import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

async function updateUsersChats(
    lastMessage: string | null,
    activeChatUserId: string,
    userId: string,
    activeChatId: string
) {
    const chatsIds = [activeChatUserId, userId];

    // console.log(`activeUser ${activeChatId}`, `user  ${activeChatUserId}`);

    chatsIds.forEach(async (id) => {
        const currentUserChatRef = doc(db, "userchats", `${id}`);
        try {
            const docSnap = await getDoc(currentUserChatRef);
            if (!docSnap.exists()) return;

            const userChatArray = docSnap.data();

            // console.log(userChatArray.chats);

            const chatIndex = userChatArray.chats.findIndex(
                (chat) => chat.chatId === activeChatId
            );
            if (chatIndex === -1) throw new Error("No chat index at ChatMain");

            if (lastMessage) {
                userChatArray.chats[
                    chatIndex
                ].lastMessage = `${lastMessage.slice(0, 10)}... `;
                userChatArray.chats[chatIndex].updatedAt = Date.now();
                userChatArray.chats[chatIndex].hasBeenOpened =
                    id === activeChatUserId ? false : true;
            } else {
                userChatArray.chats[chatIndex].hasBeenOpened = true;
            }

            await updateDoc(currentUserChatRef, {
                chats: userChatArray.chats,
            });
        } catch (error) {
            console.error(`${(error as Error).message}`);
        }
    });
}

export default updateUsersChats;
