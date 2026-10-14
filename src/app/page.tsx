'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/en/');
  }, [router]);

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center p-6 text-white text-center">
      <head>
        <meta httpEquiv="refresh" content="0; url=/en/" />
        <title>Edulearn International College Singapore</title>
      </head>
      <div className="bg-white p-3 rounded-lg shadow-lg mb-6 inline-block">
        <img
          src="/images/edulearn-logo-mark.png"
          alt="Edulearn International College"
          className="h-12 w-auto object-contain"
        />
      </div>
      <h1 className="text-xl font-serif font-bold text-white mb-2">
        Edulearn International College Singapore
      </h1>
      <p className="text-xs text-gold-400 font-mono tracking-wider uppercase mb-4">
        CPE PEI Reg No: 201708935D
      </p>
      <p className="text-xs text-slate-300 max-w-sm mb-6 leading-relaxed">
        Redirecting to official website...
      </p>
      <a
        href="/en/"
        className="px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs rounded-lg transition-colors"
      >
        Continue to English Edition &rarr;
      </a>
    </div>
  );
}
