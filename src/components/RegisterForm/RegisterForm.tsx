import "./registerForm.scss";
// import { FcGoogle } from "react-icons/fc";
// import { IconContext } from "react-icons";
import { MutableRefObject, useRef, useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase.js";
import { doc, setDoc } from "firebase/firestore";
import NotificationMessage from "../notificationMessage/NotificationMessage.js";
import { useChatContext } from "../../contexts/chatContext/ChatContext.js";

function RegisterForm() {
    const input1Ref = useRef() as MutableRefObject<HTMLInputElement>;
    const input2Ref = useRef() as MutableRefObject<HTMLInputElement>;
    const input3Ref = useRef() as MutableRefObject<HTMLInputElement>;
    const input4Ref = useRef() as MutableRefObject<HTMLInputElement>;
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<[boolean, string]>([false, ""]);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const { dispatch } = useChatContext();

    async function signIn(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError([true, "Password doesn't match"]);
            return;
        }

        setLoading(true);

        try {
            dispatch({ type: "registered", payload: true });
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            if (res.user) setSuccess(true);

            const uid = res.user.uid;

            await setDoc(doc(db, "users", `${uid}`), {
                id: uid,
                userName,
                email,
                avatar: null,
            });

            await setDoc(doc(db, "userchats", `${uid}`), {
                chats: [],
            });
        } catch (error) {
            console.error(error);
            setError([true, `${(error as Error).message}`]);
        } finally {
            setLoading(false);
            input1Ref.current.value = "";
            input2Ref.current.value = "";
            input3Ref.current.value = "";
            input4Ref.current.value = "";
        }
    }

    function handleClick() {
        setSuccess(false);
        setError([false, ""]);
    }

    return (
        <div className="form__container--register">
            <form className="register" onSubmit={(e) => signIn(e)}>
                <h1>Register</h1>
                <div className="register__inputs">
                    <input
                        ref={input1Ref}
                        type="text"
                        placeholder="user name"
                        name="user name"
                        required
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input
                        ref={input2Ref}
                        type="email"
                        placeholder="email"
                        name="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        ref={input3Ref}
                        type="password"
                        placeholder="password"
                        name="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        ref={input4Ref}
                        type="password"
                        placeholder="confirm password"
                        name="confirm password"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={loading} onClick={handleClick}>
                    Sign in
                </button>
                {/* <button className="google__btn">
                    Sign in with
                    <span>
                        <IconContext.Provider
                            value={{
                                size: "1.5rem",
                            }}>
                            <FcGoogle />
                        </IconContext.Provider>
                    </span>
                </button> */}
            </form>
            {error[0] && (
                <NotificationMessage
                    message={error[1]}
                    type={"error"}
                    messageType={"registration"}
                />
            )}
            {success && (
                <NotificationMessage
                    type={"success"}
                    messageType={"registration"}
                />
            )}
        </div>
    );
}

export default RegisterForm;
