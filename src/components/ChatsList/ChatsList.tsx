import "./chatsList.scss";
import User from "./currentUser/CurrentUser.js";
import SearchChat from "./searchChat/SearchChat.js";
import List from "./list/List.js";
import AddUser from "./addUser/AddUser.tsx";
import EditCurrentUser from "./editCurrentUser/EditCurrentUser.tsx";
import { useListContext } from "../../contexts/listContext/ListContext.tsx";

function ChatsList() {
    const { isOpenCurrentUserEdit, isOpenSearch } = useListContext();

    return (
        <section className="chat__list">
            <User />
            <SearchChat />
            {isOpenCurrentUserEdit ? <EditCurrentUser /> : <List />}
            {isOpenSearch && <AddUser />}
        </section>
    );
}

export default ChatsList;
