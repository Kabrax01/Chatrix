import "./editCurrentUser.scss";
import uploadUserImg from "../../../firebase/uploadUserImg.js";
import { useChatContext } from "../../../contexts/chatContext/ChatContext.js";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.js";

function EditCurrentUser() {
    const { state, dispatch } = useChatContext();
    const { uid } = state;

    async function handleEditUser(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const file = formData.get("avatar") as File;
        const userName = formData.get("userName") as string;

        const userDocRef = doc(db, "users", uid);

        console.log(file);

        try {
            if (file.name !== "") {
                const imgURL = await uploadUserImg(file);
                dispatch({ type: "userAvatarChange", payload: imgURL });
                await updateDoc(userDocRef, {
                    avatar: imgURL,
                });
            }
        } catch (error) {
            console.error(`${(error as Error).message}`);
        }
    }

    return (
        <div className="user__edit">
            <form onSubmit={handleEditUser}>
                <label htmlFor="avatar">Change user picture :</label>
                <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    accept="image/jpeg"
                />
                <label htmlFor="userName">Change user name :</label>
                <input type="text" maxLength={25} name="userName" />
                <button>Submit</button>
            </form>
        </div>
    );
}

export default EditCurrentUser;
