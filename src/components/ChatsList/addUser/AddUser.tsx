import "./addUser.scss";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase.js";
import { useState } from "react";
import SearchedUser from "./searchedUser/SearchedUser.js";
import { User } from "../types.js";
import CloseButton from "../../closeButton/CloseButton.js";
import { useListContext } from "../../../contexts/listContext/ListContext.js";

function AddUser() {
    const [user, setUser] = useState<null | User>(null);
    const [users, setUsers] = useState<null | User[]>(null);
    const [usersQueryEmpty, setUsersQueryEmpty] = useState(false);
    const { setIsOpenSearch } = useListContext();

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
            <CloseButton
                callback={setIsOpenSearch}
                height={1.4}
                width={1.4}
                unit={"rem"}
                margin={"0 0 .5rem 0"}
            />
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
                <div className="user__empty">
                    <p>No users found</p>
                </div>
            )}
        </div>
    );
}

export default AddUser;
