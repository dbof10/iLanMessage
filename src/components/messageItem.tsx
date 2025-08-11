import React from 'react';
import { Message } from '../chat/chatSlice';
import styles from './MessageList.module.css';
import TextMessage from "./textMessage";
import ImageMessage from "./imageMessage";
import VideoMessage from "./videoMessage";
import FileMessage from './fileMessage';

interface Props {
    message: Message;
}

export default function MessageItem({ message }: Props) {
    if (message.type === 'text') {
        return (
            <div className={styles.messageItem}>
                <TextMessage content={message.content || ''} />
            </div>
        );
    }

    if (
        message.filename?.match(/\.(jpg|jpeg|png|gif)$/i)
    ) {
        return (
            <div className={styles.messageItem}>
                <ImageMessage url={message.downloadURL!} filename={message.filename} />
            </div>
        );
    }

    if (
        message.filename?.match(/\.(mp4|mov|webm)$/i)
    ) {
        return (
            <div className={styles.messageItem}>
                <VideoMessage url={message.downloadURL!} filename={message.filename} />
            </div>
        );
    }

    return (
        <div className={styles.messageItem}>
            <FileMessage url={message.downloadURL!} filename={message.filename || 'file'} />
        </div>
    );
}
