import "./registerForm.scss";
import { FcGoogle } from "react-icons/fc";
import { IconContext } from "react-icons";
import { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase.js";
import { doc, setDoc } from "firebase/firestore";

function RegisterForm() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function signIn(e) {
        e.preventDefault();

        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const uid = res.user.uid;

            await setDoc(doc(db, "users", `${uid}`), {
                id: uid,
                userName,
                email,
                messages: [],
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="form__container--register">
            <form className="register" onSubmit={(e) => signIn(e)}>
                <h1>Register</h1>
                <div className="register__inputs">
                    <input
                        type="text"
                        placeholder="user name"
                        required
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Sign in</button>
                <button className="google__btn">
                    Sign in with
                    <span>
                        <IconContext.Provider
                            value={{
                                size: "1.5rem",
                            }}>
                            <FcGoogle />
                        </IconContext.Provider>
                    </span>
                </button>
            </form>
        </div>
    );
}

export default RegisterForm;
