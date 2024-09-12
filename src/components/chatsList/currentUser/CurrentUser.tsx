import { useChatContext } from "../../../contexts/temp/chatContext/ChatContext";
import "./currentUser.scss";
import { FaRegEdit } from "react-icons/fa";
import { useListContext } from "../../../contexts/temp/listContext/ListContext";

function User() {
    const { state } = useChatContext();
    const { user } = state;
    const { setIsOpenCurrentUserEdit } = useListContext();

    return (
        <div className="user">
            <img
                src={user?.avatar ? `${user.avatar}` : "./avatar.png"}
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
