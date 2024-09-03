import "./chatsList.scss";
import User from "./currentUser/CurrentUser.js";
import SearchChat from "./searchChat/SearchChat.js";
import List from "./list/List.js";
import AddUser from "./addUser/AddUser.tsx";
import EditCurrentUser from "./editCurrentUser/EditCurrentUser.tsx";
import { useListContext } from "../../contexts/listContext/ListContext.tsx";
import { getAuth, signOut } from "firebase/auth";

function ChatsList() {
    const { isOpenCurrentUserEdit, isOpenSearch } = useListContext();

    function logOut() {
        const auth = getAuth();
        signOut(auth);
    }

    return (
        <section className="chat__list">
            <User />
            <SearchChat />
            {isOpenCurrentUserEdit ? <EditCurrentUser /> : <List />}
            {isOpenSearch && <AddUser />}
            <div className="logout btn">
                <button onClick={logOut}>Sign Out</button>
            </div>
        </section>
    );
}

export default ChatsList;
