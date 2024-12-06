import { useContext } from "react";
import { ChatContext } from "./ChatContext";

function useChatContext() {
    const context = useContext(ChatContext);

    if (!context) throw new Error("ChatContext was used outside of provider");

    return context;
}

export default useChatContext;
