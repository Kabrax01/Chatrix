import "./editCurrentUser.scss";
import uploadUserImg from "../../../firebase/uploadUserImg.js";
import useChatContext from "../../../contexts/chatContext/useChatContext.js";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.js";
import { useState } from "react";
import Loading from "../../loading/Loading.js";
import CloseButton from "../../closeButton/CloseButton.js";
import useListContext from "../../../contexts/listContext/useListContext.js";
import { AnimatePresence, motion } from "framer-motion";

const notificationVariants = {
    hidden: {
        opacity: 0,
        x: "-100%",
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
        },
    },
    exit: {
        opacity: 0,
        x: "100%",
        transition: {
            duration: 0.5,
        },
    },
};

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
                dispatch({
                    type: "userAvatarChange",
                    payload: imgURL as string,
                });
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
            setError(`${(error as Error).message}`);
        } finally {
            setUploading(false);
            setTimeout(() => {
                setError(null);
                setSuccess(false);
            }, 3000);
        }
    }

    return (
        <motion.div
            className="user__edit"
            key="editUser"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}>
            <CloseButton
                callback={setIsOpenCurrentUserEdit}
                height={1.3}
                width={1.3}
                margin="0 1rem 1rem 1rem"
                unit={"rem"}
            />
            <h1>Settings</h1>
            <form onSubmit={handleEditUser}>
                <button disabled className="upload__btn">
                    <label className="upload__btn--label" htmlFor="avatar">
                        Change user picture
                    </label>
                </button>
                <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    accept="image/jpeg, image/webp"
                    data-testid="fileInput"
                />
                <label htmlFor="userName">Change user name :</label>
                <input
                    type="text"
                    maxLength={25}
                    name="userName"
                    id="userName"
                />
                <button className="submit__btn">Submit</button>
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
            <AnimatePresence>
                {error && (
                    <motion.p
                        variants={notificationVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        key={"error"}
                        className="user__edit--error"
                        data-testid="error">
                        {error}
                    </motion.p>
                )}
                {success && (
                    <motion.p
                        variants={notificationVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        key={"success"}
                        className="user__edit--success">
                        Upload successful !
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default EditCurrentUser;
