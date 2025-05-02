'use client';
import dynamic from 'next/dynamic';

const NewsClient = dynamic(() => import('./newsClient'), { ssr: false });

export default function NewsClientWrapper(props) {
  return <NewsClient {...props} />;
}