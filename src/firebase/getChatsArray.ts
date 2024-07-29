import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase.js";

async function getChatsArray(currentUserId: string) {
    const currentUserChatsRef = doc(db, `userchats/${currentUserId}`);
    try {
        const docSnap = await getDoc(currentUserChatsRef);
        if (docSnap.exists()) {
            console.log(docSnap.data());
            return docSnap.data();
        }
    } catch (error) {
        console.error(`${(error as Error).message}`);
    }
}

export default getChatsArray;
