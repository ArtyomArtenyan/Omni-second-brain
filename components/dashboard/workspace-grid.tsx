'use client';
import Link from 'next/link';
import { FileText, Clock, Plus } from 'lucide-react';
import { createWorkspace } from '@/app/actions/workspace';
import { useEffect, useState } from 'react';

type Workspace = {
	id: string;
	name: string;
	description?: string | null;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
};

export function WorkspaceGrid({ workspaces }: { workspaces: Workspace[] }) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);
	async function handleCreate() {
		await createWorkspace(
			'new Workspace',
			'A new workspace for organizing ideas, notes, and knowledge.',
		);
	}
	return (
		<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
			{workspaces.map(ws => (
				<Link
					key={ws.id}
					href={`/workspace/${ws.id}`}
					className='glass group flex flex-col rounded-2xl p-5 transition-colors hover:border-primary/40'
				>
					<div className='flex items-start justify-between'>
						<span
							className='flex size-10 items-center justify-center rounded-xl'
							// style={{ backgroundColor: `${ws.color}` }}
						>
							<FileText className='size-5 text-primary-foreground' />
						</span>
					</div>
					<h3 className='mt-4 font-semibold text-foreground'>{ws.name}</h3>
					<p className='mt-1 line-clamp-2 text-sm text-muted-foreground'>
						{ws.description}
					</p>
					<div className='mt-4 flex items-center gap-1.5 text-xs text-muted-foreground'>
						<Clock className='size-3.5' />
						Updated {new Date(ws.updatedAt).toISOString().split('T')[0]}
					</div>
				</Link>
			))}

			<button
				onClick={handleCreate}
				type='button'
				className='flex min-h-45 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground'
			>
				<span className='flex size-10 items-center justify-center rounded-xl border border-border'>
					<Plus className='size-5' />
				</span>
				<span className='text-sm font-medium'>New Workspace</span>
			</button>
		</div>
	);
}
