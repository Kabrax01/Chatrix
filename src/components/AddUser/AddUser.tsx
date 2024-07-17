import "./addUser.scss";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase.js";
import { useState } from "react";

interface User {
    email: string;
    id: string;
    userName: string;
}

function AddUser() {
    const [user, setUser] = useState<null | User>(null);

    async function handleSearchUser(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get("username");

        try {
            const userRef = collection(db, "users");

            const q = query(userRef, where("userName", "==", username));

            const querySnapShot = await getDocs(q);

            console.log(querySnapShot.docs[0].data());

            if (!querySnapShot.empty) {
                setUser(querySnapShot.docs[0].data() as User);
            }
        } catch (error) {
            console.error(`${(error as Error).message}`);
        }
    }

    return (
        <div className="add_user">
            <form onSubmit={handleSearchUser}>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    maxLength={20}
                />
                <button>Search</button>
            </form>
            {user && (
                <div className="user">
                    <span>{user.userName}</span>
                    <img src="user_list-8.webp" alt="" />
                </div>
            )}
        </div>
    );
}

export default AddUser;
