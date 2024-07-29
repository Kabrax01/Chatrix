import "./editCurrentUser.scss";
import uploadUserImg from "../../../firebase/uploadUserImg.js";
import { useChatContext } from "../../../contexts/chatContext/ChatContext.js";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.js";
import { useState } from "react";
import Loading from "../../loading/Loading.js";
import CloseButton from "../../closeButton/CloseButton.js";
import { useListContext } from "../../../contexts/listContext/ListContext.js";

function EditCurrentUser() {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const { state, dispatch } = useChatContext();
    const { uid } = state;
    const { setIsOpenCurrentUserEdit } = useListContext();

    async function handleEditUser(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const file = formData.get("avatar") as File;
        const userName = formData.get("userName") as string;
        const userDocRef = doc(db, "users", uid);

        try {
            setError(null);
            setSuccess(false);
            setUploading(true);
            if (file.size > 1000000) {
                throw new Error("Max file size: 1MB");
            } else if (file.name !== "") {
                const imgURL = await uploadUserImg(file);
                dispatch({ type: "userAvatarChange", payload: imgURL });
                await updateDoc(userDocRef, {
                    avatar: imgURL,
                });
                setUploading(false);
                setSuccess(true);
            }

            if (userName.length > 3) {
                await updateDoc(userDocRef, {
                    userName: userName,
                });
                dispatch({ type: "userNameChange", payload: userName });
                setUploading(false);
                setSuccess(true);
            }
        } catch (error) {
            console.error(`${(error as Error).message}`);
            setError(`${(error as Error).message}`);
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="user__edit">
            <CloseButton
                callback={setIsOpenCurrentUserEdit}
                height={1.3}
                width={1.3}
                unit={"rem"}
            />
            <form onSubmit={handleEditUser}>
                <button disabled className="upload__btn">
                    <label htmlFor="avatar">Change user picture</label>
                </button>
                <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    accept="image/jpeg image/webp"
                />
                <label htmlFor="userName">Change user name :</label>
                <input
                    type="text"
                    maxLength={25}
                    name="userName"
                    id="userName"
                />
                <button>Submit</button>
            </form>
            {uploading ? (
                <div className="upload__indicator">
                    <Loading
                        width={25}
                        height={50}
                        unit={"px"}
                        text={"Uploading..."}
                    />
                </div>
            ) : null}
            <p className="error">{error}</p>
            {error && <p className="user__edit--error">{error}</p>}
            {success && (
                <p className="user__edit--success">Upload successful !</p>
            )}
        </div>
    );
}

export default EditCurrentUser;
