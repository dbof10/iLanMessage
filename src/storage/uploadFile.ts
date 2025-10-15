import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

export async function uploadFileToFirebaseStorage(file: File) {
    const filePath = `uploads/${Date.now()}_${file.name}`;
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
