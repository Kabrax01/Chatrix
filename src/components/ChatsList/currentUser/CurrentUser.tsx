import { useContext } from "react";
import { useChatContext } from "../../../contexts/chatContext/ChatContext";
import "./currentUser.scss";
import { FaRegEdit } from "react-icons/fa";
import { ListContext } from "../ChatsList";

function User() {
    const { state } = useChatContext();
    const { user } = state;
    const context = useContext(ListContext);

    if (!context) {
        throw new Error("MyComponent must be used within a ListProvider");
    }
    const { setIsOpenCurrentUserEdit } = context;

    return (
        <div className="user">
            <img
                src={user?.avatar ? `${user.avatar}` : "avatar.png"}
                alt="Current user picture"
            />
            <p className="user__name">{user?.userName}</p>
            <span>
                <FaRegEdit
                    onClick={() => setIsOpenCurrentUserEdit((prev) => !prev)}
                />
            </span>
        </div>
    );
}

export default User;
