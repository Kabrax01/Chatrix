import { IconContext } from "react-icons";
import { FaPlus } from "react-icons/fa6";
import "./searchChat.scss";
import { useState } from "react";

function UserSearch() {
    const [inputValue, setInputValue] = useState<string>("");

    return (
        <div className="search">
            <input
                type="text"
                className="search__input"
                placeholder="Search"
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="search__btn">
                <IconContext.Provider value={{ size: "1.5rem" }}>
                    <FaPlus />
                </IconContext.Provider>
            </button>
        </div>
    );
}

export default UserSearch;
