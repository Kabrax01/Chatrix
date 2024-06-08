import "./user.scss";

function User() {
    return (
        <div className="user">
            <div
                className="user__img"
                style={{
                    backgroundImage: "url(/user1.webp)",
                }}></div>
            <p className="user__name">Arnold Rogalski</p>
        </div>
    );
}

export default User;
