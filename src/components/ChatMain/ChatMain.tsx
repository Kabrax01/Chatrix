import "./chatMain.scss";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { SlPicture, SlEmotsmile } from "react-icons/sl";
import { useChatContext } from "../../contexts/chatContext/ChatContext";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import updateUsersChats from "../../firebase/updateUserChats";
import EmojiPicker, { Theme } from "emoji-picker-react";

interface Message {
    senderId: string;
    text: string;
    createdAt: number;
}

function ChatMain() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [text, setText] = useState("");
    const endRef = useRef() as MutableRefObject<HTMLDivElement>;
    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
    const { state } = useChatContext();
    const { activeChat, activeChatUser, user } = state;

    function handleAddEmoji(obj) {
        setText((cur) => cur + obj.emoji);
    }

    useEffect(() => {
        if (endRef.current)
            endRef.current.scrollIntoView({
                behavior: "smooth",
            });
    });

    useEffect(() => {
        const unsub = onSnapshot(
            doc(db, "chats", `${activeChat?.chatId}`),

            (res) => {
                const data = res.data();
                if (data) {
                    setMessages(data.messages);
                }
            }
        );

        return () => unsub();
    }, [activeChat]);

    function handleKeyPress(e) {
        if (e.code === "Enter") handleSendMessage();
    }

    async function handleSendMessage() {
        const chatRef = doc(db, "chats", `${activeChat?.chatId}`);
        if (text === "") return;
        try {
            await updateDoc(chatRef, {
                messages: arrayUnion({
                    senderId: user?.uid,
                    text,
                    createdAt: Date.now(),
                }),
            });

            if (activeChat && user && activeChatUser) {
                await updateUsersChats(
                    text,
                    activeChatUser.id,
                    user.uid,
                    activeChat.chatId
                );
            }
        } catch (error) {
            console.error(`${(error as Error).message}`);
        } finally {
            inputRef.current.value = "";
        }

        if (endRef.current)
            endRef.current.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div className="chat">
            <div className="chat__user">
                <img
                    src={
                        activeChatUser?.avatar
                            ? activeChatUser.avatar
                            : "avatar.png"
                    }
                    alt="active chat user picture"
                />
                <div>
                    <h3>{activeChatUser?.userName}</h3>
                </div>
            </div>
            <div className="chat__messages">
                {messages.map((message) => {
                    return (
                        <div
                            className={`message
                                ${
                                    message.senderId === user?.uid
                                        ? "own"
                                        : null
                                }`}
                            key={message.createdAt}>
                            <div className="content">
                                <p>{message.text}</p>
                                {/* <span>1 min ago</span> */}
                            </div>
                        </div>
                    );
                })}
                <div ref={endRef}></div>
            </div>
            <div className="chat__input">
                <div className="emoji">
                    <EmojiPicker
                        open={openEmojiPicker}
                        theme={Theme.AUTO}
                        onEmojiClick={handleAddEmoji}
                    />
                </div>
                <input
                    type="text"
                    name="type message"
                    placeholder="Type a message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    ref={inputRef}
                    onKeyDown={handleKeyPress}
                />
                <IconContext.Provider value={{ size: "1.5rem" }}>
                    <div className="icons">
                        <SlPicture />
                        <SlEmotsmile
                            onClick={() => setOpenEmojiPicker((prev) => !prev)}
                        />
                    </div>
                </IconContext.Provider>
                <button className="send btn" onClick={handleSendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatMain;
