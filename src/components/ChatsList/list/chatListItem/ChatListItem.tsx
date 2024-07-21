import "./chatListItem.scss";
import { User } from "../../types";

interface ListItemProps {
    user: User;
}

function ChatListItem({ user }: ListItemProps) {
    // const lastMessage = messages.at(-1);
    const { email, id, userName, avatar } = user;

    return (
        <li className="item">
            {/* <div
                className="item__img"
                style={{ backgroundImage: `url(${img})` }}>

                </div> */}
            <div className="item__text">
                <h3>{user.userName}</h3>
                {/* <p>{lastMessage}</p> */}
            </div>
        </li>
    );
}

export default ChatListItem;
