import { getAuth, signOut } from "firebase/auth";
import "./chatDetails.scss";

function logOut() {
    const auth = getAuth();
    signOut(auth);
}

function ChatCurrent() {
    return (
        <div className="chat__current">
            <button onClick={logOut}>Sign Out</button>
        </div>
    );
}

export default ChatCurrent;
