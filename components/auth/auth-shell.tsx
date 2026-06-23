import Link from 'next/link';
import { OmniLogo } from '@/components/omni-logo';

export function AuthShell({
	title,
	subtitle,
	children,
	footer,
}: {
	title: string;
	subtitle: string;
	children: React.ReactNode;
	footer: React.ReactNode;
}) {
	return (
		<main className='relative flex min-h-dvh items-center justify-center overflow-hidden bg-dot-grid px-4 py-12'>
			<div className='pointer-events-none absolute -top-20 left-1/4 size-105 animate-pulse rounded-full bg-primary/20 blur-[130px]' />
			<div className='pointer-events-none absolute -bottom-24 right-1/4 size-95 animate-pulse rounded-full bg-accent/20 blur-[130px] [animation-delay:1s]' />

			<div className='w-full max-w-sm'>
				<div className='mb-6 flex justify-center'>
					<OmniLogo size={32} />
				</div>

				<div className='glass rounded-2xl p-7 shadow-2xl'>
					<div className='text-center'>
						<h1 className='text-2xl font-semibold tracking-tight text-foreground'>
							{title}
						</h1>
						<p className='mt-1.5 text-sm text-muted-foreground'>{subtitle}</p>
					</div>

					<div className='mt-6'>{children}</div>
				</div>

				<p className='mt-6 text-center text-sm text-muted-foreground'>
					{footer}
				</p>

				<p className='mt-6 text-center text-xs text-muted-foreground'>
					<Link href='/' className='transition-colors hover:text-foreground'>
						← Back to home
					</Link>
				</p>
			</div>
		</main>
	);
}
