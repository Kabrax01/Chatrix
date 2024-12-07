import "./chatsList.scss";
import CurrentUser from "./currentUser/CurrentUser.tsx";
import SearchChat from "./searchChat/SearchChat.tsx";
import List from "./list/List.tsx";
import AddUser from "./addUser/AddUser.tsx";
import EditCurrentUser from "./editCurrentUser/EditCurrentUser.tsx";
import useListContext from "../../contexts/listContext/useListContext";
import { getAuth, signOut } from "firebase/auth";
import { AnimatePresence } from "framer-motion";
import useChatContext from "../../contexts/chatContext/useChatContext.tsx";

function ChatsList() {
    const { isOpenCurrentUserEdit, isOpenSearch, isMenuOpen } =
        useListContext();

    const { dispatch } = useChatContext();

    function logOut() {
        const auth = getAuth();
        signOut(auth);
        dispatch({ type: "loggedOut" });
    }

    return (
        <section className={`chat__list ${isMenuOpen ? "active" : ""}`}>
            <CurrentUser />
            <SearchChat />
            <AnimatePresence mode="wait">
                {isOpenCurrentUserEdit ? (
                    <EditCurrentUser key="editUser" />
                ) : (
                    <List key="list" />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isOpenSearch && <AddUser key="addUser" />}
            </AnimatePresence>
            <div className="logout btn">
                <button onClick={logOut}>Sign Out</button>
            </div>
        </section>
    );
}

export default ChatsList;
