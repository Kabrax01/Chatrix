import "./chatMain.scss";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { SlPicture, SlEmotsmile } from "react-icons/sl";
import { IoMdReturnLeft } from "react-icons/io";
import { useChatContext } from "../../contexts/chatContext/ChatContext";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import updateUsersChats from "../../firebase/updateUserChats";
import uploadUserImg from "../../firebase/uploadUserImg";
import EmojiPicker, { Theme } from "emoji-picker-react";
import Loading from "../loading/Loading";
import { useListContext } from "../../contexts/listContext/ListContext";

interface Message {
    senderId: string;
    text: string;
    createdAt: number;
    img: string;
}

function ChatMain() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [text, setText] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const endRef = useRef() as MutableRefObject<HTMLDivElement>;
    const inputRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const { isMenuOpen, setIsMenuOpen } = useListContext();
    const { state } = useChatContext();
    const { activeChat, activeChatUser, user } = state;

    async function handleAddImage(e) {
        if (!e.target.files[0]) return;

        try {
            setLoading(true);
            const imageUrl = await uploadUserImg(e.target.files[0]);

            setImage(imageUrl as string);
        } catch (error) {
            console.error(`${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    }

    function handleAddEmoji(obj) {
        setText((cur) => cur + obj.emoji);
    }

    function openEmojiWidow() {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }
        console.log(screenWidth);
        window.addEventListener("resize", handleResize);
        setOpenEmojiPicker((prev) => !prev);
    }

    useEffect(() => {
        if (!endRef.current) return;
        setTimeout(() => {
            endRef.current.scrollIntoView({
                behavior: "smooth",
            });
        }, 300);
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
        if (text === "" && image === null) return;

        try {
            await updateDoc(chatRef, {
                messages: arrayUnion({
                    senderId: user?.uid,
                    text,
                    createdAt: Date.now(),
                    img: image ? image : null,
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
            setText("");
            setImage(null);
            inputRef.current.value = "";
            setOpenEmojiPicker(false);
            if (endRef.current)
                endRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        <div className={`chat ${isMenuOpen ? "" : "active"}`}>
            <div className="chat__user">
                <img
                    className="user__img"
                    src={
                        activeChatUser?.avatar
                            ? activeChatUser.avatar
                            : "./avatar.png"
                    }
                    alt="active chat user picture"
                />
                <div>
                    <h3>{activeChatUser?.userName}</h3>
                </div>
                <img className="logo--small" src="./logo-small.svg" alt="" />
                <span className="return">
                    <IoMdReturnLeft onClick={() => setIsMenuOpen(true)} />
                </span>
            </div>
            <div className="chat__messages">
                {messages.map((message) => {
                    return (
                        <div
                            className={`message ${
                                message.senderId === user?.uid ? "own" : ""
                            }`}
                            key={message.createdAt}>
                            <div className="content">
                                {message.img && (
                                    <img
                                        src={message.img}
                                        className="sended__img"
                                    />
                                )}
                                {message.text && <p>{message.text}</p>}
                            </div>
                        </div>
                    );
                })}
                <div ref={endRef}></div>
            </div>
            <div className="chat__input">
                <div className="emoji" role="button">
                    <EmojiPicker
                        open={openEmojiPicker}
                        theme={Theme.AUTO}
                        onEmojiClick={handleAddEmoji}
                        width={`${screenWidth < 400 ? "270px" : ""}`}
                    />
                </div>
                <textarea
                    name="type message"
                    placeholder="Type a message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    ref={inputRef}
                    onKeyDown={handleKeyPress}
                />
                <IconContext.Provider value={{ size: "1.5rem" }}>
                    <div className="icons">
                        <label htmlFor="icons__file__input">
                            <SlPicture className="icons__image" />
                        </label>
                        <input
                            type="file"
                            id="icons__file__input"
                            name="user image"
                            accept="image/jpeg, image/webp"
                            onChange={handleAddImage}
                        />
                        <SlEmotsmile
                            className="icons__emoji"
                            onClick={openEmojiWidow}
                        />
                    </div>
                </IconContext.Provider>
                <button
                    className="send btn"
                    onClick={handleSendMessage}
                    disabled={loading}>
                    {loading ? (
                        <Loading
                            width={1}
                            height={1}
                            unit="rem"
                            margin="0 0.75rem"
                            color="black"
                        />
                    ) : (
                        "Send"
                    )}
                </button>
            </div>
        </div>
    );
}

export default ChatMain;
