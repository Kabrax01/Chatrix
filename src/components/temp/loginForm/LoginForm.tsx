import { MutableRefObject, useRef, useState } from "react";
import "./loginForm.scss";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import NotificationMessage from "../notificationMessage/NotificationMessage";
import { useChatContext } from "../../../contexts/chatContext/ChatContext";
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
    const input1Ref = useRef() as MutableRefObject<HTMLInputElement>;
    const input2Ref = useRef() as MutableRefObject<HTMLInputElement>;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<[boolean, string]>([false, ""]);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const { dispatch } = useChatContext();

    async function logIn(e) {
        e.preventDefault();
        setLoading(true);

        const auth = getAuth();

        try {
            const res = await signInWithEmailAndPassword(auth, email, password);

            if (res.user) {
                dispatch({ type: "registered", payload: false });
                setSuccess(true);
            }
        } catch (error) {
            console.error(error);
            setError([true, `${(error as Error).message}`]);
        } finally {
            setLoading(false);
            input1Ref.current.value = "";
            input2Ref.current.value = "";
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
                        ref={input1Ref}
                        type="email"
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <motion.input
                        variants={formVariants}
                        ref={input2Ref}
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
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
