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
    const [users, setUsers] = useState<null | User[]>(null);
    const [usersQueryEmpty, setUsersQueryEmpty] = useState(false);

    async function handleSearchUser(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get("username");

        try {
            const userRef = collection(db, "users");

            const q = query(userRef, where("userName", "==", username));

            const querySnapShot = await getDocs(q);

            if (!querySnapShot.empty) {
                setUsersQueryEmpty(false);
                if (querySnapShot.docs.length === 1) {
                    setUser(querySnapShot.docs[0].data() as User);
                    setUsers(null);
                } else if (querySnapShot.docs.length > 1) {
                    const users: User[] = [];

                    querySnapShot.forEach((doc) => {
                        users.push(doc.data() as User);
                    });
                    setUsers(users);
                    setUser(null);
                }
            } else {
                setUsers(null);
                setUser(null);
                setUsersQueryEmpty(true);
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
            {users &&
                users.map((user, i) => {
                    return (
                        <div className="user" key={i}>
                            <div className="user__credentials">
                                <p>{user.userName}</p>
                                <p>{user.email}</p>
                            </div>
                            <img src="user_list-8.webp" alt="User picture" />
                        </div>
                    );
                })}
            {user && (
                <div className="user">
                    <div className="user__credentials">
                        <p>{user.userName}</p>
                        <p>{user.email}</p>
                    </div>
                    <img src="user_list-8.webp" alt="User picture" />
                </div>
            )}
            {usersQueryEmpty && (
                <div className="user__empty">
                    <p>No users found</p>
                </div>
            )}
        </div>
    );
}

export default AddUser;
