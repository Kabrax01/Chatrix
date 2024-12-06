import "./registerForm.scss";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import NotificationMessage from "../notificationMessage/NotificationMessage.js";
import useChatContext from "../../contexts/chatContext/useChatContext.js";
import { motion } from "framer-motion";
import { isValidEmail } from "../../utils/emailValidation.ts";

const formVariants = {
    initial: {
        opacity: 0,
        rotateY: "90deg",
    },
    animate: {
        opacity: 1,
        rotateY: 0,
        transition: { duration: 0.5, staggerChildren: 0.2 },
    },
};

function RegisterForm() {
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
        }
    }

    function validate(e) {
        e.preventDefault();

        if (!userName || !email || !password || !confirmPassword) {
            setError([true, "All fields must be filled"]);
            return;
        }

        if (!userName) {
            setError([true, "Please type user name"]);
            return;
        }

        const validEmail = isValidEmail(email);

        if (!email || !validEmail) {
            setError([true, "Please type valid email"]);
            return;
        }

        if (password.length < 8) {
            setError([true, "Password must have at least 8 characters"]);
            return;
        }

        if (password !== confirmPassword) {
            setError([true, "Password doesn't match"]);
            return;
        }

        signIn(e);
    }

    function handleClick() {
        setSuccess(false);
        setError([false, ""]);
    }

    return (
        <div className="form__container--register">
            <motion.form
                variants={formVariants}
                initial="initial"
                animate="animate"
                className="register"
                onSubmit={validate}>
                <h1>Register</h1>
                <div className="register__inputs">
                    <motion.input
                        variants={formVariants}
                        type="text"
                        placeholder="user name"
                        name="user name"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <motion.input
                        variants={formVariants}
                        type="text"
                        placeholder="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <motion.input
                        variants={formVariants}
                        data-testid="password"
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <motion.input
                        variants={formVariants}
                        type="password"
                        placeholder="confirm password"
                        name="confirm password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <motion.button
                    variants={formVariants}
                    type="submit"
                    disabled={loading}
                    onClick={handleClick}>
                    Sign in
                </motion.button>
            </motion.form>
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
