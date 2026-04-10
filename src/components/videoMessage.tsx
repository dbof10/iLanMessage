import React, { useEffect, useRef, useState } from 'react';
import DownloadIcon from './DownloadIcon';
import styles from './MessageList.module.css';

interface Props {
    url: string;
    filename?: string;
}

export default function VideoMessage({ url, filename }: Props) {
    const [loaded, setLoaded] = useState(false);
    const [failed, setFailed] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        setLoaded(false);
        setFailed(false);
    }, [url]);

    useEffect(() => {
        const el = videoRef.current;
        if (el && el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            setLoaded(true);
        }
    }, [url]);

    const markLoaded = () => setLoaded(true);

    return (
        <div className={styles.videoMessageFrame} aria-busy={!loaded && !failed}>
            {!loaded && !failed && (
                <div className={styles.videoSkeleton} aria-hidden />
            )}
            {failed ? (
                <div className={styles.videoError} role="alert">
                    Could not load video
                </div>
            ) : (
                <video
                    ref={videoRef}
                    controls
                    playsInline
                    preload="auto"
                    aria-label={filename ? `Video: ${filename}` : 'Shared video'}
                    src={url}
                    className={`${styles.videoPreview} ${loaded ? styles.videoPreviewLoaded : ''}`}
                    onLoadedData={markLoaded}
                    onCanPlay={markLoaded}
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
                    title={filename ? `Download ${filename}` : 'Download video'}
                    aria-label={filename ? `Download ${filename}` : 'Download video'}
                >
                    <DownloadIcon />
                </a>
            )}
        </div>
    );
}
