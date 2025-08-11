import React from 'react';
import styles from './MessageList.module.css';

interface Props {
    url: string;
    filename?: string;
}

export default function ImageMessage({ url, filename }: Props) {
    return (
        <img
            src={url}
            alt={filename}
            className={styles.imagePreview}
        />
    );
}
