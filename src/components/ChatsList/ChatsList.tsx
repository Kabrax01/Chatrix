import User from "../User/User";
import UserSearch from "../UserSearch/UserSearch";
import "./chatsList.scss";

function ChatsList() {
    return (
        <section className="chat__list">
            <User />
            <UserSearch />
        </section>
    );
}

export default ChatsList;
