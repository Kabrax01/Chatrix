import "./editCurrentUser.scss";
import uploadUserImg from "../../../firebase/uploadUserImg.js";
import { CgCloseR } from "react-icons/cg";
import { useChatContext } from "../../../contexts/chatContext/ChatContext.js";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.js";
import { useContext, useState } from "react";
import Loading from "../../loading/Loading.js";
import { ListContext } from "../ChatsList.js";

function EditCurrentUser() {
    const [uploading, setUploading] = useState(false);
    const { state, dispatch } = useChatContext();
    const { uid } = state;

    const context = useContext(ListContext);

    if (!context) {
        throw new Error("MyComponent must be used within a ListProvider");
    }
    const { setIsOpenCurrentUserEdit } = context;

    async function handleEditUser(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const file = formData.get("avatar") as File;
        const userName = formData.get("userName") as string;

        const userDocRef = doc(db, "users", uid);

        console.log(file);

        try {
            setUploading(true);
            if (file.name !== "") {
                const imgURL = await uploadUserImg(file);
                dispatch({ type: "userAvatarChange", payload: imgURL });
                await updateDoc(userDocRef, {
                    avatar: imgURL,
                });
            }

            if (userName.length > 3) {
                await updateDoc(userDocRef, {
                    userName: userName,
                });
                dispatch({ type: "userNameChange", payload: userName });
            }
        } catch (error) {
            console.error(`${(error as Error).message}`);
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="user__edit">
            <span
                role="button"
                onClick={() => setIsOpenCurrentUserEdit((prev) => !prev)}>
                <CgCloseR className="user__edit-close" />
            </span>

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
        </div>
    );
}

export default EditCurrentUser;
