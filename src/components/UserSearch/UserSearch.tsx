import { IconContext } from "react-icons";
import { FaPlus } from "react-icons/fa6";
import "./userSearch.scss";

function UserSearch() {
    return (
        <div className="search">
            <input type="text" className="search__input" placeholder="Search" />
            <button className="search__btn">
                <IconContext.Provider value={{ size: "1.5rem" }}>
                    <FaPlus />
                </IconContext.Provider>
            </button>
        </div>
    );
}

export default UserSearch;
