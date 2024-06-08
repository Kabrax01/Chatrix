import "./registerForm.scss";

function RegisterForm() {
    return (
        <div className="form__container">
            <form className="register">
                <h1>Register</h1>
                <div className="register__inputs">
                    <input type="text" required />
                    <input type="email" required />
                    <input type="password" required />
                </div>
                <button type="submit">Sign in</button>
            </form>
        </div>
    );
}

export default RegisterForm;
