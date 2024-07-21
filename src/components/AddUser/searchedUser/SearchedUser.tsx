import "./searchedUser.scss";
import { User } from "../AddUser";
import { db } from "../../../firebase/firebase.js";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";

interface UserProps {
    user: User;
}

function SearchedUser({ user }: UserProps) {
    async function handleAddUser() {
        const chatRef = collection(db, "chats");
        const userChatsRef = collection(db, "userchats");

        try {
            const newChatRef = doc(chatRef);

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });

            console.log(newChatRef.id);
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
