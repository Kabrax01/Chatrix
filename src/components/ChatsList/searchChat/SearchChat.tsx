import { IconContext } from "react-icons";
import { FaMinus, FaPlus } from "react-icons/fa6";
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
                    {isOpenSearch ? <FaMinus /> : <FaPlus />}
                </IconContext.Provider>
            </button>
        </div>
    );
}

export default UserSearch;
