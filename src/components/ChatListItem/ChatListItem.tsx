import "./chatListItem.scss";

interface UserProps {
    name: string;
    img: string;
    messages: string[];
}

function ChatListItem({ name, img, messages }: UserProps) {
    const lastMessage = messages.at(-1);

    return (
        <li className="item">
            <div
                className="item__img"
                style={{ backgroundImage: `url(${img})` }}></div>
            <div className="item__text">
                <h3>{name}</h3>
                <p>{lastMessage}</p>
            </div>
        </li>
    );
}

export default ChatListItem;
