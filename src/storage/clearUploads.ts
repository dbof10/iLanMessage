import { deleteObject, listAll, ref, type StorageReference } from "firebase/storage";
import { storage } from "../firebase";
import { UPLOADS_STORAGE_PREFIX } from "./uploadFile";

async function deleteFolderRecursive(folderRef: StorageReference): Promise<void> {
    const { items, prefixes } = await listAll(folderRef);
    await Promise.all(items.map((itemRef) => deleteObject(itemRef)));
    await Promise.all(prefixes.map((prefixRef) => deleteFolderRecursive(prefixRef)));
}

/** Removes every object under the uploads prefix (matches uploadFile paths). */
export async function clearAllUploadedFiles(): Promise<void> {
    const uploadsRef = ref(storage, UPLOADS_STORAGE_PREFIX);
    await deleteFolderRecursive(uploadsRef);
}
