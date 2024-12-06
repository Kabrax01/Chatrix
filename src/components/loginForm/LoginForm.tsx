import { useState } from "react";
import "./loginForm.scss";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import NotificationMessage from "../notificationMessage/NotificationMessage";
import useChatContext from "../../contexts/chatContext/useChatContext";
import { motion } from "framer-motion";

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

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<[boolean, string]>([false, ""]);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const { dispatch } = useChatContext();

    async function logIn(e) {
        e.preventDefault();

        if (!email || !password) {
            setError([true, "All fields are required"]);
            return;
        }
        setLoading(true);

        const auth = getAuth();

        try {
            const res = await signInWithEmailAndPassword(auth, email, password);

            if (res.user) {
                setSuccess(true);
                dispatch({ type: "registered", payload: false });
                dispatch({ type: "loggedIn", payload: res.user.uid });
            }
        } catch (error) {
            console.error(error);
            setError([true, `${(error as Error).message}`]);
        } finally {
            setLoading(false);
        }
    }

    function handleClick() {
        setSuccess(false);
        setError([false, ""]);
    }

    return (
        <div className="form__container--login">
            <motion.form
                variants={formVariants}
                initial="initial"
                animate="animate"
                className="login"
                onSubmit={(e) => logIn(e)}>
                <h1>Welcome back</h1>
                <div className="login__inputs">
                    <motion.input
                        variants={formVariants}
                        type="email"
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <motion.input
                        variants={formVariants}
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <motion.button
                    variants={formVariants}
                    type="submit"
                    onClick={handleClick}
                    disabled={loading}>
                    Log in
                </motion.button>
            </motion.form>
            {error[0] && (
                <NotificationMessage
                    message={error[1]}
                    type={"error"}
                    messageType={"login"}
                />
            )}
            {success && (
                <NotificationMessage type={"success"} messageType={"login"} />
            )}
        </div>
    );
}

export default LoginForm;
