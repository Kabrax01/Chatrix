import "./chatMain.scss";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { SlPicture, SlEmotsmile } from "react-icons/sl";
import { useChatContext } from "../../contexts/chatContext/ChatContext";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

interface Message {
    senderId: string;
    text: string;
    createdAt: number;
}

function ChatMain() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState("");
    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
    const { state } = useChatContext();
    const { activeChat, activeChatUser, user } = state;

    useEffect(() => {
        console.log("activechat log");
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
                    createdAt: new Date(),
                }),
            });
        } catch (error) {
            console.error(`${(error as Error).message}`);
        } finally {
            inputRef.current.value = "";
        }
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
                            className={
                                message.senderId === user?.uid
                                    ? "message own"
                                    : "message"
                            }
                            key={message.createdAt}>
                            <div className="content">
                                <p>{message.text}</p>
                                {/* <span>1 min ago</span> */}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="chat__input">
                <input
                    type="text"
                    name="type message"
                    placeholder="Type a message..."
                    onChange={(e) => setText(e.target.value)}
                    ref={inputRef}
                    onKeyDown={handleKeyPress}
                />
                <IconContext.Provider value={{ size: "1.5rem" }}>
                    <div className="icons">
                        <SlPicture />
                        <SlEmotsmile />
                    </div>
                </IconContext.Provider>
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default ChatMain;
