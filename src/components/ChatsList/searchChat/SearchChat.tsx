import { IconContext } from "react-icons";
import { FiUserMinus, FiUserPlus } from "react-icons/fi";
import "./searchChat.scss";
import { useState } from "react";
import { useListContext } from "../../../contexts/listContext/ListContext";

function UserSearch() {
    const [inputValue, setInputValue] = useState<string>("");
    const { isOpenSearch, setIsOpenSearch } = useListContext();

    return (
        <div className="search">
            <input
                type="text"
                className="search__input"
                name="active chats search"
                placeholder="Search"
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button
                className="search__btn"
                onClick={() => setIsOpenSearch((prev) => !prev)}>
                <IconContext.Provider value={{ size: "1.3rem" }}>
                    {isOpenSearch ? <FiUserMinus /> : <FiUserPlus />}
                </IconContext.Provider>
            </button>
        </div>
    );
}

export default UserSearch;
