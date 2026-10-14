import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://edulearn.edu.sg'),
  title: 'Edulearn International College | Registered PEI Singapore',
  description: 'Edulearn International College (CPE Reg No: 201708935D) provides accredited Diplomas, Advanced Diplomas, and Modular Certifications in Singapore.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-alabaster text-navy-900 font-sans antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
