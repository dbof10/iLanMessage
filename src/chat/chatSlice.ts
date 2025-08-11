import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store";

export interface Message {
    type: 'text' | 'file';
    content?: string;
    filename?: string;
    downloadURL?: string;
    sender: string;
    timestamp: number;
}

interface ChatState {
    messages: Message[];
    loading: boolean;
    error: string | null;
}

const initialState: ChatState = {
    messages: [],
    loading: false,
    error: null,
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setMessages(state, action: PayloadAction<Message[]>) {
            state.messages = action.payload;
        },
        addMessage(state, action: PayloadAction<Message>) {
            const exists = state.messages.some(
                (m) =>
                    m.timestamp === action.payload.timestamp &&
                    m.sender === action.payload.sender &&
                    m.type === action.payload.type &&
                    (m.content === action.payload.content || m.downloadURL === action.payload.downloadURL)
            );
            if (!exists) {
                state.messages.push(action.payload);
            }
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const {setMessages, addMessage, setLoading, setError} = chatSlice.actions;

const selectChat = (state: RootState) => state.chat;

export const selectMessages = createSelector(
    [selectChat],
    (chat) => chat.messages
);
