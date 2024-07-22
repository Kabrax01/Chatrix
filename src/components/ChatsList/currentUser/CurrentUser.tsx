import "./currentUser.scss";

function User() {
    const avatar = null;

    return (
        <div className="user">
            <img
                src={avatar ? `${avatar}` : "avatar.png"}
                alt="Current user picture"
            />
            <p className="user__name">Arnold Rogalski</p>
        </div>
    );
}

export default User;
