'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';

import siteMetadata from '@/data/siteMetadata';

interface Props {
  mapping: string;
}

const Giscus = ({ mapping }: Props) => {
  const [enableLoadComments, setEnabledLoadComments] = useState(true);
  const { theme, resolvedTheme } = useTheme();
  const commentsTheme =
    siteMetadata.comments.giscusConfig.themeURL === ''
      ? theme === 'dark' || resolvedTheme === 'dark'
        ? siteMetadata.comments.giscusConfig.darkTheme
        : siteMetadata.comments.giscusConfig.theme
      : siteMetadata.comments.giscusConfig.themeURL;

  const COMMENTS_ID = 'comments-container';

  const LoadComments = useCallback(() => {
    setEnabledLoadComments(false);
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', siteMetadata.comments.giscusConfig.repo);
    script.setAttribute(
      'data-repo-id',
      siteMetadata.comments.giscusConfig.repositoryId,
    );
    script.setAttribute(
      'data-category',
      siteMetadata.comments.giscusConfig.category,
    );
    script.setAttribute(
      'data-category-id',
      siteMetadata.comments.giscusConfig.categoryId,
    );
    script.setAttribute(
      'data-mapping',
      siteMetadata.comments.giscusConfig.mapping,
    );
    script.setAttribute(
      'data-reactions-enabled',
      siteMetadata.comments.giscusConfig.reactions,
    );
    script.setAttribute(
      'data-emit-metadata',
      siteMetadata.comments.giscusConfig.metadata,
    );
    script.setAttribute('data-theme', commentsTheme);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    const comments = document.getElementById(COMMENTS_ID);
    if (comments) comments.appendChild(script);

    return () => {
      const comments = document.getElementById(COMMENTS_ID);
      if (comments) comments.innerHTML = '';
    };
  }, [commentsTheme, mapping]);

  // Reload on theme change
  useEffect(() => {
    const iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe) return;
    LoadComments();
  }, [LoadComments]);

  return (
    <div className='pt-6 pb-6 text-center text-gray-700 dark:text-gray-300'>
      {enableLoadComments && (
        <button onClick={LoadComments}>Load Comments</button>
      )}
      <div className='giscus' id={COMMENTS_ID} />
    </div>
  );
};

export default Giscus;