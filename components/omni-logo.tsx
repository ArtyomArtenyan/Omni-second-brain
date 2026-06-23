import Image from 'next/image';
import Link from 'next/link';

export function OmniLogo({
	className,
	href = '/',
	showWordmark = true,
	size = 28,
}: {
	className?: string;
	href?: string | null;
	showWordmark?: boolean;
	size?: number;
}) {
	const content = (
		<span className={`inline-flex items-center gap-2 ${className}`}>
			<span
				className='relative flex items-center justify-center rounded-lg'
				style={{ width: size, height: size }}
			>
				<Image
					src='/favicon/logo.png'
					alt='Omni logo'
					width={size}
					height={size}
					className='object-contain'
					priority
				/>
			</span>
			{showWordmark && (
				<span className='text-lg font-semibold tracking-tight text-foreground'>
					Omni
				</span>
			)}
		</span>
	);

	if (href === null) return content;

	return (
		<Link href={href} className='inline-flex'>
			{content}
		</Link>
	);
}
