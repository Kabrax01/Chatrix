import "./chatListItem.scss";
import {
    ActiveChatUserObject,
    Chat,
} from "../../../../contexts/chatContext/chatContextTypes";
import { useChatContext } from "../../../../contexts/chatContext/ChatContext";

interface ListItemProps {
    user: ActiveChatUserObject;
    chat: Chat;
}

function ChatListItem({ user, chat }: ListItemProps) {
    const { userName, avatar } = user;
    const { dispatch } = useChatContext();

    function handleSelectActiveChatUser() {
        dispatch({
            type: "activeChatSelect",
            payload: { activeUser: user, activeChat: chat },
        });
        console.log(chat);
    }

    return (
        <li className="item" onClick={handleSelectActiveChatUser}>
            <img src={avatar ? `${avatar}` : "avatar.png"} alt="User picture" />
            <div className="item__text">
                <h3>{userName}</h3>
            </div>
        </li>
    );
}

export default ChatListItem;
