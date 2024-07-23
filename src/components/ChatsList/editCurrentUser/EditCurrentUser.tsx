import { useState } from "react";
import "./editCurrentUser.scss";
import uploadUserImg from "../../../firebase/uploadUserImg.js";

function EditCurrentUser() {
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    async function handleEditUser(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const file = formData.get("avatar") as File;
        const userName = formData.get("userName") as string;

        console.log(file);

        try {
            if (file.name !== "") {
                const imgURL = await uploadUserImg(file);
                setFileUrl(imgURL);
            }
        } catch (error) {
            console.error(`${(error as Error).message}`);
        }
    }

    return (
        <div className="user__edit">
            <form onSubmit={handleEditUser}>
                <label htmlFor="avatar">Change user picture</label>
                <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    accept="image/jpeg"
                />
                <label htmlFor="userName">Change user name</label>
                <input type="text" maxLength={25} name="userName" />
                <button>Submit</button>
            </form>
        </div>
    );
}

export default EditCurrentUser;
