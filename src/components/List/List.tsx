import "./list.scss";
import usersData from "../../assets/users";
import ChatListItem from "../ChatListItem/ChatListItem";

function List() {
    return (
        <div className="list">
            <ul>
                {usersData.map((user) => (
                    <ChatListItem
                        name={user.name}
                        img={user.img}
                        messages={user.messages}
                        key={user.name}
                    />
                ))}
            </ul>
        </div>
    );
}

export default List;
