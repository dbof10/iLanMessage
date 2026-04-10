import React, { useLayoutEffect, useRef } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import markdown from 'highlight.js/lib/languages/markdown';
import sql from 'highlight.js/lib/languages/sql';
import 'highlight.js/styles/github.css';
import styles from './MessageList.module.css';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('css', css);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('sql', sql);

interface Props {
    content: string;
}

export default function SnippetMessage({ content }: Props) {
    const codeRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const el = codeRef.current;
        if (!el) return;
        const { value } = hljs.highlightAuto(content);
        el.innerHTML = value;
        el.className = 'hljs';
    }, [content]);

    return (
        <pre className={styles.snippetPre}>
            <code ref={codeRef} className="hljs" />
        </pre>
    );
}
