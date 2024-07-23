import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

async function uploadUserImg(file) {
    const storageRef = ref(
        storage,
        "userImages/" + `${file.name + Date.now()}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                if (snapshot.bytesTransferred === snapshot.totalBytes)
                    console.log("Upload successful");
            },
            (error) => {
                reject(error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
                    resolve(downloadURL)
                );
            }
        );
    });
}

export default uploadUserImg;
