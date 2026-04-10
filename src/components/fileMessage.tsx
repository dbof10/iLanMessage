import React from 'react';
import DownloadIcon from './DownloadIcon';
import styles from './MessageList.module.css';

interface Props {
    url: string;
    filename: string;
}

export default function FileMessage({ url, filename }: Props) {
    return (
        <a
            href={url}
            download={filename}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.fileLink}
        >
            <span>Download {filename}</span>
            <DownloadIcon />
        </a>
    );
}
