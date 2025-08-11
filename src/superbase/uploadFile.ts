import { supabase } from "../superbase";


export async function uploadFileToSupabase(file: File) {
    const filePath = `${Date.now()}_${file.name}`;

    // Upload
    const { error } = await supabase.storage
        .from("chat-bucket")
        .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
        });

    if (error) {
        console.error("Upload error:", error);
        throw error;
    }

    // Generate signed URL that expires in 1 month
    // 1 month = 60 sec * 60 min * 24 hrs * 30 days
    const expiryInSeconds = 60 * 60 * 24 * 30;

    const { data, error: signError } = await supabase.storage
        .from("chat-bucket")
        .createSignedUrl(filePath, expiryInSeconds);

    if (signError) {
        console.error("Signed URL error:", signError);
        throw signError;
    }

    return data.signedUrl;
}
