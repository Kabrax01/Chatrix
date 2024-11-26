import { useEffect, useState } from "react";
import "./notificationMessage.scss";

type NotificationProps = {
    message?: string;
    type: "error" | "success";
    messageType: "registration" | "login";
    displayPeriod?: number;
};

function NotificationMessage({
    message,
    type,
    messageType,
    displayPeriod = 5,
}: NotificationProps) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const init = setTimeout(() => setShow(true), 10);
        const disappearAfterXAmountOfTime = setTimeout(
            () => setShow(false),
            displayPeriod * 1000
        );

        return () => {
            clearTimeout(disappearAfterXAmountOfTime);
            clearTimeout(init);
        };
    }, [displayPeriod]);

    const errorNotifications = [
        "Registration failed 😥...",
        "Login failed 😥...",
    ];

    const successNotifications = [
        "Registration successful 🥳, you can log in !",
        "Login successful 🥳",
    ];

    let notification;

    switch (type) {
        case "error": {
            messageType === "registration"
                ? (notification = errorNotifications[0])
                : (notification = errorNotifications[1]);
            break;
        }
        case "success": {
            messageType === "registration"
                ? (notification = successNotifications[0])
                : (notification = successNotifications[1]);
        }
    }

    return (
        <div
            className={`${type === "error" ? "error" : "success"} ${
                show ? "active" : "hidden"
            }`}
            role="alert">
            <h3>{notification}</h3>
            <p>{message}</p>
        </div>
    );
}

export default NotificationMessage;
