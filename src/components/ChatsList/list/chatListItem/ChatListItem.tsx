import "./chatListItem.scss";
import { User } from "../../types";

interface ListItemProps {
    user: User;
}

function ChatListItem({ user }: ListItemProps) {
    const { userName, avatar } = user;

    return (
        <li className="item">
            <img src={avatar ? `${avatar}` : "avatar.png"} alt="User picture" />
            <div className="item__text">
                <h3>{userName}</h3>
            </div>
        </li>
    );
}

export default ChatListItem;
