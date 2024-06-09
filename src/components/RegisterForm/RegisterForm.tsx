import "./registerForm.scss";
import { FcGoogle } from "react-icons/fc";
import { IconContext } from "react-icons";

function RegisterForm() {
    return (
        <div className="form__container--register">
            <form className="register">
                <h1>Register</h1>
                <div className="register__inputs">
                    <input type="text" placeholder="user name" required />
                    <input type="email" placeholder="email" required />
                    <input type="password" placeholder="password" required />
                </div>
                <button type="submit">Sign in</button>
                <button className="google__btn">
                    Sign with google
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
