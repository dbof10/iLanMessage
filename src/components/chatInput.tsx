import React, { useState } from 'react';
import { AppDispatch } from '../store';
import { clearMessages, sendSnippetMessage, sendTextMessage } from '../chat/chatThunk';
import { useDispatch } from 'react-redux';
import styles from './ChatInput.module.css';

/** If the entire message is wrapped in ``` … ```, returns the inner code; otherwise null. */
function tryExtractFencedCode(raw: string): string | null {
    const t = raw.trim();
    if (t.length < 6 || !t.startsWith('```') || !t.endsWith('```')) {
        return null;
    }
    const inner = t.slice(3, -3).trim();
    return inner.length > 0 ? inner : null;
}

export default function ChatInput() {
    const dispatch = useDispatch<AppDispatch>();
    const [text, setText] = useState('');

    const handleSend = () => {
        if (!text.trim()) return;
        const fenced = tryExtractFencedCode(text);
        if (fenced !== null) {
            dispatch(sendSnippetMessage(fenced, 'mac1'));
        } else {
            dispatch(sendTextMessage(text, 'mac1'));
        }
        setText('');
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
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
                className={styles.input}
                rows={3}
            />
            <button type="button" onClick={handleSend} className={styles.sendButton}>
                Send
            </button>
            <button type="button" onClick={handleClear} className={styles.clearButton}>
                Clear
            </button>
        </div>
    );
}
