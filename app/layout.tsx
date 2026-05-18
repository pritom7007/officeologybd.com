import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Officeology BD | Curated Workspaces & Desk Essentials',
  description: 'Premium desk organizers, leather felt mats, and minimalist study essentials meticulously handcrafted.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning className="bg-brand-50 text-neutral-800 antialiased overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
