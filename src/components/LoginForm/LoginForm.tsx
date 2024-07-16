import { MutableRefObject, useRef, useState } from "react";
import "./loginForm.scss";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import NotificationMessage from "../NotificationMessage/NotificationMessage";
import { useChatContext } from "../../contexts/ChatContext/ChatContext";

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
            <form className="login" onSubmit={(e) => logIn(e)}>
                <h1>Welcome back</h1>
                <div className="login__inputs">
                    <input
                        ref={input1Ref}
                        type="email"
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        ref={input2Ref}
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" onClick={handleClick} disabled={loading}>
                    Log in
                </button>
            </form>
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
