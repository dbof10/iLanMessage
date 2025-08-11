import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css'; // Or your preferred style
import styles from './MessageList.module.css';

interface Props {
    content: string;
}

export default function TextMessage({ content }: Props) {
    return (
        <div className={styles.textContent}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    a: ({ node, ...props }) => (
                        <a {...props} className={styles.textLink} target="_blank" rel="noopener noreferrer" />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
