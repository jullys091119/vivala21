// app/noticias/[id]/NewsClientWrapper.js
'use client';

import dynamic from 'next/dynamic';

const NewsClient = dynamic(() => import('../newsClient'), { ssr: false });

export default function NewsClientWrapper({ noticia }) {
  return <NewsClient noticia={noticia} />;
}
