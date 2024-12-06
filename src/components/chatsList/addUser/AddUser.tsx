import "./addUser.scss";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase.js";
import { useState } from "react";
import SearchedUser from "./searchedUser/SearchedUser.js";
import { User } from "../../../contexts/chatContext/chatContextTypes.ts";
import CloseButton from "../../closeButton/CloseButton.js";
import { useListContext } from "../../../contexts/listContext/ListContext.js";
import { motion } from "framer-motion";
import useChatContext from "../../../contexts/chatContext/useChatContext.tsx";

function AddUser() {
    const [user, setUser] = useState<null | User>(null);
    const [users, setUsers] = useState<null | User[]>(null);
    const [usersQueryEmpty, setUsersQueryEmpty] = useState(false);
    const { setIsOpenSearch } = useListContext();
    const { state } = useChatContext();
    const { uid } = state;

    async function handleSearchUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username")?.toString().toLowerCase();

        function reset() {
            setUsers(null);
            setUser(null);
            setUsersQueryEmpty(true);
        }

        if (username === "") {
            reset();
            return;
        }

        try {
            const userRef = collection(db, "users");
            const querySnapShot = await getDocs(userRef);

            if (!querySnapShot.empty) {
                const allUsers: User[] = [];

                querySnapShot.forEach((doc) => {
                    if (doc.data().id !== uid)
                        allUsers.push(doc.data() as User);
                });

                const filteredUsers = allUsers.filter((user) =>
                    user.userName.toLowerCase().includes(username || "")
                );

                if (filteredUsers.length === 1) {
                    setUser(filteredUsers[0]);
                    setUsers(null);
                    setUsersQueryEmpty(false);
                } else if (filteredUsers.length > 1) {
                    setUsers(filteredUsers);
                    setUser(null);
                    setUsersQueryEmpty(false);
                } else {
                    reset();
                }
            }
        } catch (error) {
            console.error(`${(error as Error).message}`);
        }
    }

    return (
        <motion.div
            className="add_user"
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}>
            <CloseButton
                callback={setIsOpenSearch}
                height={1.4}
                width={1.4}
                unit={"rem"}
                margin={"0 0 .5rem 0"}
            />
            <h2>Search user</h2>
            <form onSubmit={handleSearchUser}>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    maxLength={25}
                />
                <button>Search</button>
            </form>
            {users &&
                users.map((user, i) => <SearchedUser user={user} key={i} />)}
            {user && <SearchedUser user={user} />}
            {usersQueryEmpty && (
                <motion.div
                    className="user__empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}>
                    <p>No users found</p>
                </motion.div>
            )}
        </motion.div>
    );
}

export default AddUser;
