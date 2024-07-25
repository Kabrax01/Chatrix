import { IconContext } from "react-icons";
import { FaMinus, FaPlus } from "react-icons/fa6";
import "./searchChat.scss";
import { useContext, useState } from "react";
import { ListContext } from "../ChatsList";

function UserSearch() {
    const [inputValue, setInputValue] = useState<string>("");

    const context = useContext(ListContext);

    if (!context) {
        throw new Error("MyComponent must be used within a ListProvider");
    }

    const { isOpenSearch, setIsOpenSearch } = context;

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
