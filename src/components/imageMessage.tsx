import React, { useEffect, useRef, useState } from 'react';
import DownloadIcon from './DownloadIcon';
import styles from './MessageList.module.css';

interface Props {
    url: string;
    filename?: string;
}

export default function ImageMessage({ url, filename }: Props) {
    const [loaded, setLoaded] = useState(false);
    const [failed, setFailed] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        setLoaded(false);
        setFailed(false);
    }, [url]);

    useEffect(() => {
        const el = imgRef.current;
        if (el?.complete && el.naturalHeight > 0) {
            setLoaded(true);
        }
    }, [url]);

    return (
        <div
            className={styles.imageMessageFrame}
            aria-busy={!loaded && !failed}
        >
            {!loaded && !failed && (
                <div className={styles.imageSkeleton} aria-hidden />
            )}
            {failed ? (
                <div className={styles.imageError} role="alert">
                    Could not load image
                </div>
            ) : (
                <img
                    ref={imgRef}
                    src={url}
                    alt={filename || 'Shared image'}
                    className={`${styles.imagePreview} ${loaded ? styles.imagePreviewLoaded : ''}`}
                    onLoad={() => setLoaded(true)}
                    onError={() => {
                        setFailed(true);
                        setLoaded(true);
                    }}
                />
            )}
            {loaded && !failed && (
                <a
                    href={url}
                    {...(filename ? { download: filename } : {})}
                    className={styles.mediaDownloadLink}
                    title={filename ? `Download ${filename}` : 'Download image'}
                    aria-label={filename ? `Download ${filename}` : 'Download image'}
                >
                    <DownloadIcon />
                </a>
            )}
        </div>
    );
}
