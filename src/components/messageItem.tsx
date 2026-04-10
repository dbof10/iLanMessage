import React, { useCallback } from 'react';
import toast from 'react-hot-toast';
import { Message } from '../chat/chatSlice';
import styles from './MessageList.module.css';
import TextMessage from "./textMessage";
import ImageMessage from "./imageMessage";
import VideoMessage from "./videoMessage";
import FileMessage from './fileMessage';

interface Props {
    message: Message;
}

function CopyMessageIcon() {
    return (
        <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
        >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
    );
}

export default function MessageItem({ message }: Props) {
    const copyTextContent = useCallback(async () => {
        const text = message.type === 'text' ? message.content || '' : '';
        if (!text) return;
        try {
            await navigator.clipboard.writeText(text);
            toast.success('Copied to clipboard');
        } catch {
            toast.error('Could not copy');
        }
    }, [message]);

    if (message.type === 'text') {
        return (
            <div className={styles.messageItem}>
                <div className={styles.textMessageRow}>
                    <div className={styles.textMessageBody}>
                        <TextMessage content={message.content || ''} />
                    </div>
                    <button
                        type="button"
                        className={styles.copyMessageButton}
                        onClick={copyTextContent}
                        title="Copy message"
                        aria-label="Copy message"
                    >
                        <CopyMessageIcon />
                    </button>
                </div>
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
