import { IconContext } from "react-icons";
import { FiUserMinus, FiUserPlus } from "react-icons/fi";
import "./searchChat.scss";
import { useEffect, useState } from "react";
import useListContext from "../../../contexts/listContext/useListContext";
import { motion } from "framer-motion";
import useChatContext from "../../../contexts/chatContext/useChatContext";

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
    const [inputValue, setInputValue] = useState<string>("");
    const { isOpenSearch, setIsOpenSearch } = useListContext();
    const { state, dispatch } = useChatContext();
    const { chats, filteredChats } = state;

    function filterChats(e) {
        setInputValue(e.target.value);

        const filtered = chats
            ? chats.filter((chat) =>
                  chat.user.userName
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
              )
            : [];

        dispatch({ type: "filterChats", payload: filtered });
    }

    useEffect(() => {
        if (filteredChats === null) setInputValue("");
    }, [filteredChats]);

    return (
        <div className="search">
            <input
                type="text"
                className="search__input"
                name="active chats search"
                placeholder="Search in your chats"
                onChange={filterChats}
                value={inputValue}
            />
            <motion.button
                variants={chats?.length !== 0 ? stopVariants : buttonVariants}
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
