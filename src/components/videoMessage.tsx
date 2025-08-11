import React from 'react';
import styles from './MessageList.module.css';

interface Props {
    url: string;
    filename?: string;
}

export default function VideoMessage({ url, filename }: Props) {
    return (
        <video
            controls
            src={url}
            className={styles.videoPreview}
        />
    );
}
