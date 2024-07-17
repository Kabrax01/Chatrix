import { IconContext } from "react-icons";
import "./chatMain.scss";
import { SlPicture, SlEmotsmile } from "react-icons/sl";

function ChatMain() {
    return (
        <div className="chat">
            <div className="chat__user">
                <img src="user1.webp" alt="" />
                <div>
                    <h3>John Doe</h3>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
            </div>
            <div className="chat__messages">
                <div className="message">
                    <img src="user1.webp" alt="" />
                    <div className="content">
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Deleniti rerum nostrum mollitia perspiciatis
                            asperiores, modi debitis? Officiis laboriosam, rerum
                            libero et vero dolore dolorem voluptatum, pariatur
                            praesentium ab facilis, reprehenderit nostrum?
                            Voluptatum provident quae molestiae quia inventore
                            corporis nobis facilis.
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="content">
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Deleniti rerum nostrum mollitia perspiciatis
                            asperiores, modi debitis? Officiis laboriosam, rerum
                            libero et vero dolore dolorem voluptatum, pariatur
                            praesentium ab facilis, reprehenderit nostrum?
                            Voluptatum provident quae molestiae quia inventore
                            corporis nobis facilis.
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
            </div>
            <div className="chat__input">
                <input type="text" placeholder="Type a message..." />
                <IconContext.Provider value={{ size: "1.5rem" }}>
                    <div className="icons">
                        <SlPicture />
                        <SlEmotsmile />
                    </div>
                </IconContext.Provider>
                <button>Send</button>
            </div>
        </div>
    );
}

export default ChatMain;
