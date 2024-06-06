import User from "../User/User";
import SearchChat from "../SearchChat/SearchChat";
import "./chatsList.scss";
import List from "../List/List";

function ChatsList() {
    return (
        <section className="chat__list">
            <User />
            <SearchChat />
            <List />
        </section>
    );
}

export default ChatsList;
