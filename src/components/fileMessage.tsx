import React from 'react';
import styles from './MessageList.module.css';

interface Props {
    url: string;
    filename: string;
}

export default function FileMessage({ url, filename }: Props) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.fileLink}
        >
            Download {filename}
        </a>
    );
}
