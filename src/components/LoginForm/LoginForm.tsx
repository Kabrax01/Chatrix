import "./loginForm.scss";

function LoginForm() {
    return (
        <div className="form__container">
            <form className="login">
                <h1>Welcome back</h1>
                <div className="login__inputs">
                    <input type="email" required />
                    <input type="password" required />
                </div>
                <button type="submit">Log in</button>
            </form>
        </div>
    );
}

export default LoginForm;
