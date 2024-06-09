import "./loginForm.scss";

function LoginForm() {
    return (
        <div className="form__container--login">
            <form className="login">
                <h1>Welcome back</h1>
                <div className="login__inputs">
                    <input type="email" placeholder="email" required />
                    <input type="password" placeholder="password" required />
                </div>
                <button type="submit">Log in</button>
            </form>
        </div>
    );
}

export default LoginForm;
