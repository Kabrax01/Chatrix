import { IconContext } from "react-icons";
import { FiUserMinus, FiUserPlus } from "react-icons/fi";
import "./searchChat.scss";
// import { useState } from "react";
import { useListContext } from "../../../contexts/listContext/ListContext";
import { motion } from "framer-motion";
import { useChatContext } from "../../../contexts/chatContext/ChatContext";

const buttonVariants = {
    animate: {
        scale: [1, 1.2, 1],
        boxShadow: ["none", "0 0 15px rgba(255,255,255,0.8)", "none"],
        transition: {
            repeat: 10,
            duration: 1.5,
        },
    },
};

const stopVariants = {
    animate: {
        scale: 1,
        boxShadow: "none",
    },
};

function UserSearch() {
    // const [inputValue, setInputValue] = useState<string>("");
    const { isOpenSearch, setIsOpenSearch } = useListContext();
    const { state } = useChatContext();
    const { activeChat } = state;

    return (
        <div className="search">
            <input
                type="text"
                className="search__input"
                name="active chats search"
                placeholder="Search in your chats"
                // onChange={(e) => setInputValue(e.target.value)}
            />
            <motion.button
                variants={activeChat ? stopVariants : buttonVariants}
                animate="animate"
                className="search__btn"
                onClick={() => setIsOpenSearch((prev) => !prev)}>
                <IconContext.Provider value={{ size: "1.3rem" }}>
                    {isOpenSearch ? <FiUserMinus /> : <FiUserPlus />}
                </IconContext.Provider>
            </motion.button>
        </div>
    );
}

export default UserSearch;
