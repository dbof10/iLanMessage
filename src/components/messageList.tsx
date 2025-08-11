import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMessages } from '../chat/chatSlice';
import styles from './MessageList.module.css';
import { AppDispatch } from '../store';
import { sendFileMessage } from '../chat/chatThunk';
import MessageItem from "./messageItem";

export default function MessageList() {
    const dispatch = useDispatch<AppDispatch>();
    const messages = useSelector(selectMessages);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragCounter = useRef(0);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages]);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        dragCounter.current += 1;
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        dragCounter.current -= 1;
        if (dragCounter.current === 0) {
            setIsDragging(false);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        dragCounter.current = 0;
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            Array.from(files).forEach((file) => {
                dispatch(sendFileMessage(file, 'mac1'));
            });
        } else {
            console.warn('No files found in drop event.');
        }
    };


    return (
        <div
            ref={containerRef}
            className={styles.messageListWrapper}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {isDragging && (
                <div className={styles.dropBackdrop}>
                    Drop file to upload
                </div>
            )}
            <div className={styles.messageList}>
                {messages.map((msg, i) => (
                    <MessageItem key={i} message={msg} />
                ))}
            </div>
        </div>
    );
}
