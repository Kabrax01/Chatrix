import "./registerForm.scss";
// import { FcGoogle } from "react-icons/fc";
// import { IconContext } from "react-icons";
import { MutableRefObject, useRef, useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase.js";
import { doc, setDoc } from "firebase/firestore";
import NotificationMessage from "../NotificationMessage/NotificationMessage.js";

function RegisterForm() {
    const input1Ref = useRef() as MutableRefObject<HTMLInputElement>;
    const input2Ref = useRef() as MutableRefObject<HTMLInputElement>;
    const input3Ref = useRef() as MutableRefObject<HTMLInputElement>;
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<[boolean, string]>([false, ""]);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    async function signIn(e) {
        e.preventDefault();
        setLoading(true);

        try {
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
                messages: [],
            });
        } catch (error) {
            console.error(error);
            setError([true, `${(error as Error).message}`]);
        } finally {
            setLoading(false);
            input1Ref.current.value = "";
            input2Ref.current.value = "";
            input3Ref.current.value = "";
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
                        required
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input
                        ref={input2Ref}
                        type="email"
                        placeholder="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        ref={input3Ref}
                        type="password"
                        placeholder="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
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
