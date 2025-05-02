// app/noticias/[id]/NewsClientWrapper.js
'use client';

import dynamic from 'next/dynamic';


export default function NewsClientWrapper({ noticia }) {
  return <NewsClient noticia={noticia} />;
}
