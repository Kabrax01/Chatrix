import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

async function uploadUserImg(file) {
    const storageRef = ref(
        storage,
        "userImages/" + `${file.name + Date.now()}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    try {
        const res = await uploadTask;

        if (res.state === "success") {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            return downloadURL as string;
        }
    } catch (error) {
        return error;
    }
}

export default uploadUserImg;
