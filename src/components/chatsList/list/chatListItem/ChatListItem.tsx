import "./chatListItem.scss";
import {
    ActiveChatUserObject,
    Chat,
} from "../../../../contexts/temp/chatContext/chatContextTypes";
import { useChatContext } from "../../../../contexts/temp/chatContext/ChatContext";
import updateUsersChats from "../../../../firebase/updateUserChats";
import { useListContext } from "../../../../contexts/temp/listContext/ListContext";

interface ListItemProps {
    user: ActiveChatUserObject;
    chat: Chat;
}

function ChatListItem({ user, chat }: ListItemProps) {
    const { userName, avatar } = user;
    const { state, dispatch } = useChatContext();
    const { user: currentUser } = state;

    const { setIsMenuOpen } = useListContext();

    function handleSelectActiveChatUser() {
        dispatch({
            type: "activeChatSelect",
            payload: { activeUser: user, activeChat: chat },
        });

        async function updateChats() {
            if (currentUser)
                updateUsersChats(null, user.id, currentUser?.uid, chat.chatId);
        }

        updateChats();
        setIsMenuOpen(false);
    }

    return (
        <li
            className="item"
            onClick={handleSelectActiveChatUser}
            style={{
                backgroundColor: `${
                    chat.hasBeenOpened ? "transparent" : "hsl(226, 66%, 70%)"
                }`,
            }}>
            <img
                src={avatar ? `${avatar}` : "./avatar.png"}
                alt="User picture"
            />
            <div className="item__text">
                <h3>{userName}</h3>
                <p>{chat.lastMessage}</p>
            </div>
        </li>
    );
}

export default ChatListItem;
