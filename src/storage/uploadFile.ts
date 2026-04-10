import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

/** All chat uploads use this Storage prefix; clear uses the same path. */
export const UPLOADS_STORAGE_PREFIX = "uploads";

export async function uploadFileToFirebaseStorage(file: File) {
    const filePath = `${UPLOADS_STORAGE_PREFIX}/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, filePath);
    const metadata = file.type ? { contentType: file.type } : undefined;

    try {
        await uploadBytes(storageRef, file, metadata);
        return await getDownloadURL(storageRef);
    } catch (error) {
        console.error("Firebase Storage upload failed:", error);
        throw error instanceof Error ? error : new Error("Unknown upload error");
    }
}
