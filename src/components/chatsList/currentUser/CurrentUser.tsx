import useChatContext from "../../../contexts/chatContext/useChatContext";
import "./currentUser.scss";
import { FaRegEdit } from "react-icons/fa";
import useListContext from "../../../contexts/listContext/useListContext";

function CurrentUser() {
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
            <span
                role="button"
                aria-label="Show user settings"
                onClick={() => setIsOpenCurrentUserEdit((prev) => !prev)}>
                <FaRegEdit />
            </span>
        </div>
    );
}

export default CurrentUser;
