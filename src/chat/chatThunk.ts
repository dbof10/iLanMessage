import {onChildAdded, push, ref, remove, set} from 'firebase/database';
import {addMessage, Message, setError, setLoading, setMessages} from './chatSlice';
import {db} from "../firebase";
import {AppDispatch} from '../store';
import toast from "react-hot-toast";
import {uploadFileToSupabase} from "../superbase/uploadFile";

export const subscribeToMessages = () => (dispatch: AppDispatch) => {
    const messagesRef = ref(db, 'messages');
    onChildAdded(messagesRef, (snapshot) => {
        const data = snapshot.val() as Message;
        dispatch(addMessage(data));
    });
};

export const sendTextMessage = (text: string, sender: string) => async (dispatch: AppDispatch) => {
    try {
        const messageRef = push(ref(db, 'messages'));
        await set(messageRef, {
            type: 'text',
            content: text,
            sender,
            timestamp: Date.now(),
        });
    } catch (error) {
        dispatch(setError((error as Error).message));
    }
};

export const sendFileMessage = (file: File, sender: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const downloadURL = await uploadFileToSupabase(file);

        const messageRef = push(ref(db, 'messages'));
        await set(messageRef, {
            type: 'file',
            filename: file.name,
            downloadURL,
            sender,
            timestamp: Date.now(),
        });
    } catch (error) {
        const errMsg = (error as Error).message;
        dispatch(setError(errMsg));
        toast.error(`Upload failed: ${errMsg}`);
    } finally {
        dispatch(setLoading(false));
    }
};


export const clearMessages = () => async (dispatch: AppDispatch) => {
    const messagesRef = ref(db, 'messages');
    await remove(messagesRef);
    dispatch(setMessages([]));
};