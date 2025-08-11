import React, { useState } from 'react';
import { AppDispatch } from '../store';
import { clearMessages, sendTextMessage } from '../chat/chatThunk';
import { useDispatch } from 'react-redux';
import styles from './ChatInput.module.css';

export default function ChatInput() {
    const dispatch = useDispatch<AppDispatch>();
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim()) {
            dispatch(sendTextMessage(text, 'mac1'));
            setText('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };

    const handleClear = () => {
        if (window.confirm('Are you sure you want to clear all messages?')) {
            dispatch(clearMessages());
        }
    };

    return (
        <div className={styles.container}>
          <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className={styles.input}
              rows={3}
          />
            <button onClick={handleSend} className={styles.sendButton}>
                Send
            </button>
            <button onClick={handleClear} className={styles.clearButton}>
                Clear
            </button>
        </div>
    );
}
