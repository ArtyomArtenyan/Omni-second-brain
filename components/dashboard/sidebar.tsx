'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	Plus,
	LayoutGrid,
	Settings,
	Pencil,
	Ellipsis,
	PencilIcon,
	ShareIcon,
	TrashIcon,
} from 'lucide-react';

import { OmniLogo } from '@/components/omni-logo';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';
import { createWorkspace, getWorkspaces } from '@/app/actions/workspace';
import { BsThreeDots } from 'react-icons/bs';
import { useState } from 'react';
import {
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenu,
} from '../ui/dropdown-menu';

type User = {
	name: string;
	email: string;
	image?: string | null;
};

type Workspace = {
	id: string;
	name: string;
	description?: string | null;
	createdAt: Date;
	userId: string;
	color: string;
};

export function AppSidebar({
	user,
	workspaces,
}: {
	user?: User;
	workspaces: Workspace[];
}) {
	const initials = user?.name ? getInitials(user.name) : '?';

	const pathname = usePathname();
	async function handleCreate() {
		await createWorkspace(
			'new Workspace',
			'A new workspace for organizing ideas, notes, and knowledge.',
		);
	}

	return (
		<aside className='hidden w-64 shrink-0 flex-col border-r border-border bg-sidebar md:flex'>
			<div className='flex h-16 items-center border-b border-border px-5'>
				<OmniLogo size={26} showWordmark={true} />
			</div>

			<div className='flex flex-1 flex-col gap-1 overflow-y-auto p-3'>
				<Link
					href='/dashboard'
					className={`
						flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors
						${
							pathname === '/dashboard'
								? 'bg-secondary text-foreground'
								: 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
						}
					`}
				>
					<LayoutGrid className='size-4' />
					Dashboard
				</Link>

				<div className='mt-4 mb-1 flex items-center justify-between px-3'>
					<span className='text-xs font-medium tracking-wide text-muted-foreground uppercase'>
						Workspaces
					</span>
				</div>
				{workspaces.map(ws => {
					const href = `/workspace/${ws.id}`;
					const active = pathname.startsWith(href);
					return (
						<Link
							key={ws.id}
							href={href}
							className={`
								group
								flex items-center  justify-between gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors
							
							 ${
									active
										? 'bg-secondary text-foreground'
										: 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
								}
								`}
						>
							<div className='flex items-center gap-2.5'>
								<span
									className='size-2.5 shrink-0 rounded-sm'
									style={{ backgroundColor: ws.color }}
								/>
								<span className='truncate'>{ws.name}</span>
							</div>

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<button
										type='button'
										onClick={e => e.preventDefault()}
										className='opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg hover:bg-secondary'
									>
										<Ellipsis className='size-4 text-muted-foreground' />
									</button>
								</DropdownMenuTrigger>
								<DropdownMenuContent side='right'>
									<DropdownMenuGroup>
										<DropdownMenuItem>
											<PencilIcon />
											Edit
										</DropdownMenuItem>
										<DropdownMenuItem>
											<ShareIcon />
											Share
										</DropdownMenuItem>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuItem variant='destructive'>
										<TrashIcon />
										Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</Link>
					);
				})}

				<Button
					onClick={handleCreate}
					variant='outline'
					size='sm'
					className='mt-3 justify-start'
				>
					<Plus className='size-4' />
					New Workspace
				</Button>
			</div>

			<div className='border-t border-border p-3'>
				<div className='flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-secondary/60'>
					<Avatar className='size-8'>
						<AvatarImage src={user?.image ?? ''} alt={user?.name ?? ''} />

						<AvatarFallback className='gradient-violet text-xs text-primary-foreground'>
							{initials}
						</AvatarFallback>
					</Avatar>
					<div className='min-w-0 flex-1'>
						<p className='truncate text-sm font-medium text-foreground'>
							{user?.name}
						</p>
						<p className='truncate text-xs text-muted-foreground'>
							{user?.email}
						</p>
					</div>
					<Settings className='size-4 text-muted-foreground' />
				</div>
			</div>
		</aside>
	);
}
