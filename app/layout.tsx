import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Omni — Your AI Second Brain',
	description:
		'Omni is the AI second brain that helps you think less and know more. Upload anything, ask anything, remember everything.',
	generator: 'v0.app',
	icons: {
		icon: '/favicon/web-app-manifest-192x192.png',
	},
};

export const viewport: Viewport = {
	colorScheme: 'dark',
	themeColor: '#080808',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			className={`dark ${geistSans.variable} ${geistMono.variable} bg-background`}
		>
			<body className='font-sans antialiased'>{children}</body>
		</html>
	);
}
