import { Search, Bell } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';

export function TopBar({ title }: { title?: string }) {
	const initials = title ? getInitials(title) : '?';

	return (
		<header className='flex h-16 shrink-0 items-center gap-4 border-b border-border px-4 sm:px-6'>
			<div className='relative flex-1 sm:max-w-md'>
				<Search className='absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground' />
				<input
					type='search'
					placeholder='Search your knowledge…'
					className='h-9 w-full rounded-lg border border-input bg-background/60 pr-3 pl-9 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50'
				/>
			</div>
			<div className='ml-auto flex items-center gap-2'>
				<button
					type='button'
					aria-label='Notifications'
					className='relative flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground'
				>
					<Bell className='size-4.5' />
					<span className='absolute top-2 right-2.5 size-1.5 rounded-full bg-primary' />
				</button>
				<Avatar className='size-8'>
					<AvatarFallback className='gradient-violet text-xs text-primary-foreground'>
						{initials}
					</AvatarFallback>
				</Avatar>
			</div>
		</header>
	);
}
