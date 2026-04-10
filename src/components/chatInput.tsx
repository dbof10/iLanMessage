import React, { useCallback, useState } from 'react';
import { AppDispatch } from '../store';
import { clearMessages, sendFileMessage, sendSnippetMessage, sendTextMessage } from '../chat/chatThunk';
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

function extensionForMime(mime: string): string {
    if (mime === 'image/png') return 'png';
    if (mime === 'image/gif') return 'gif';
    if (mime === 'image/webp') return 'webp';
    if (mime === 'image/jpeg' || mime === 'image/jpg') return 'jpg';
    if (mime === 'image/svg+xml') return 'svg';
    return 'png';
}

/** Ensures a stable filename for storage (clipboard images often use generic names). */
function withUsableImageName(file: File): File {
    const name = file.name?.trim();
    const hasGoodName = Boolean(name && !/^image\.?$/i.test(name.replace(/\.[^.]+$/, '')));
    if (hasGoodName && /\.(png|jpe?g|gif|webp|svg)$/i.test(name!)) {
        return file;
    }
    const ext = extensionForMime(file.type || 'image/png');
    return new File([file], `pasted-${Date.now()}.${ext}`, { type: file.type || 'image/png' });
}

function firstImageFileFromClipboard(data: DataTransfer | null): File | null {
    if (!data) return null;
    const items = data.items;
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind !== 'file') continue;
        const f = item.getAsFile();
        if (f?.type.startsWith('image/')) return f;
    }
    const { files } = data;
    for (let i = 0; i < files.length; i++) {
        const f = files[i];
        if (f.type.startsWith('image/')) return f;
    }
    return null;
}

export default function ChatInput() {
    const dispatch = useDispatch<AppDispatch>();
    const [text, setText] = useState('');
    const [pastedImage, setPastedImage] = useState<{ file: File; url: string } | null>(null);

    const clearPastedImage = useCallback(() => {
        setPastedImage((prev) => {
            if (prev?.url) URL.revokeObjectURL(prev.url);
            return null;
        });
    }, []);

    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        const raw = firstImageFileFromClipboard(e.clipboardData);
        if (!raw) return;
        e.preventDefault();
        const file = withUsableImageName(raw);
        const url = URL.createObjectURL(file);
        setPastedImage((prev) => {
            if (prev?.url) URL.revokeObjectURL(prev.url);
            return { file, url };
        });
    };

    const handleSend = () => {
        const trimmed = text.trim();
        const hasImage = pastedImage !== null;
        if (!trimmed && !hasImage) return;

        if (trimmed) {
            const fenced = tryExtractFencedCode(text);
            if (fenced !== null) {
                dispatch(sendSnippetMessage(fenced, 'mac1'));
            } else {
                dispatch(sendTextMessage(text, 'mac1'));
            }
            setText('');
        }

        if (hasImage && pastedImage) {
            dispatch(sendFileMessage(pastedImage.file, 'mac1'));
            URL.revokeObjectURL(pastedImage.url);
            setPastedImage(null);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleClear = () => {
        if (
            window.confirm(
                'Clear all messages and delete every file in storage for this chat? This cannot be undone.'
            )
        ) {
            dispatch(clearMessages());
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.inputColumn}>
                {pastedImage ? (
                    <div className={styles.pastePreview}>
                        <img src={pastedImage.url} alt="" className={styles.pasteThumb} />
                        <button
                            type="button"
                            className={styles.removePaste}
                            onClick={clearPastedImage}
                            aria-label="Remove pasted image"
                            title="Remove pasted image"
                        >
                            ×
                        </button>
                    </div>
                ) : null}
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    onPaste={handlePaste}
                    className={styles.input}
                    rows={3}
                />
            </div>
            <button type="button" onClick={handleSend} className={styles.sendButton}>
                Send
            </button>
            <button type="button" onClick={handleClear} className={styles.clearButton}>
                Clear
            </button>
        </div>
    );
}
