'use client';

import { useState } from 'react';
import {
	Ellipsis,
	PencilIcon,
	ShareIcon,
	TrashIcon,
	Check,
} from 'lucide-react'; // Добавили Check
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateWorkspace, deleteWorkspace } from '@/app/actions/workspace';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

type Workspace = {
	id: string;
	name: string;
	description: string | null;
	color: string;
};
const WORKSPACE_COLORS = [
	{ id: 'violet', value: '#6366f1' },
	{ id: 'indigo', value: '#4f46e5' },
	{ id: 'blue', value: '#2563eb' },
	{ id: 'cyan', value: '#0891b2' },
	{ id: 'emerald', value: '#059669' },
	{ id: 'rose', value: '#e11d48' },
	{ id: 'amber', value: '#d97706' },
	{ id: 'zinc', value: '#71717a' },
];
export function WorkspaceHeader({ workspace }: { workspace: Workspace }) {
	const router = useRouter();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [title, setTitle] = useState(workspace.name);
	const [description, setDescription] = useState(workspace.description || '');
	const [color, setColor] = useState(workspace.color);
	const [loading, setLoading] = useState(false);

	async function handleSave() {
		try {
			setLoading(true);
			await updateWorkspace(workspace.id, title, color, description);
			setIsDialogOpen(false);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	async function handleDelete() {
		try {
			setLoading(true);
			await deleteWorkspace(workspace.id);
			setIsDeleteDialogOpen(false);
			router.push('/dashboard');
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<header className='flex h-16 shrink-0 items-center gap-3 border-b border-border px-4 sm:px-6'>
				<span
					className={`size-3 rounded-xl `}
					style={{ backgroundColor: color }}
				/>
				<h1 className='truncate text-sm font-semibold text-foreground'>
					{title}
				</h1>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button
							type='button'
							className='ml-auto flex items-center justify-center rounded-lg p-1.5 hover:bg-secondary transition-colors cursor-pointer'
						>
							<Ellipsis className='size-4 text-muted-foreground' />
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent side='right'>
						<DropdownMenuGroup>
							<DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
								<PencilIcon />
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem>
								<ShareIcon />
								Share
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							variant='destructive'
							onClick={() => setIsDeleteDialogOpen(true)}
						>
							<TrashIcon />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</header>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Workspace</DialogTitle>
					</DialogHeader>
					<div className='flex flex-col gap-4 py-4'>
						<div className='flex flex-col gap-4'>
							<div className='flex flex-col gap-2'>
								<Label htmlFor='workspace-name'>Name</Label>
								<Input
									id='workspace-name'
									value={title}
									onChange={e => setTitle(e.target.value)}
									placeholder='Workspace name'
								/>
							</div>
							<div className='flex flex-col gap-2'>
								<Label htmlFor='workspace-description'>Description</Label>
								<Textarea
									id='workspace-description'
									placeholder='What is this workspace for?'
									value={description || ''}
									onChange={e => setDescription(e.target.value)}
									className='resize-none min-h-20 max-h-60 overflow-y-auto'
								/>
							</div>
							<div className='flex flex-col gap-2'>
								<Label>Workspace color</Label>

								<div className='flex flex-wrap gap-3'>
									{WORKSPACE_COLORS.map(c => {
										const isSelected =
											color.toLowerCase() === c.value.toLowerCase();
										return (
											<button
												onClick={() => setColor(c.value)}
												key={c.id}
												type='button'
												className={`
													group relative h-8 w-8 rounded-full transition-all duration-200 cursor-pointer
													hover:scale-110 active:scale-90
													focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
												style={{ backgroundColor: c.value }}
											>
												{isSelected && (
													<Check className='absolute inset-0 m-auto h-4 w-4 text-white' />
												)}
											</button>
										);
									})}
								</div>
							</div>
						</div>
					</div>
					<DialogFooter>
						<Button variant='outline' onClick={() => setIsDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleSave} disabled={loading}>
							{loading && (
								<AiOutlineLoading3Quarters
									className='animate-spin mr-2'
									size={16}
								/>
							)}
							Save
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete Workspace</DialogTitle>
					</DialogHeader>
					<div className='py-4 text-sm text-muted-foreground'>
						Are you sure you want to delete <span className='font-semibold text-foreground'>"{workspace.name}"</span>?
						This action cannot be undone and will permanently delete all associated documents, messages, and content.
					</div>
					<DialogFooter>
						<Button variant='outline' onClick={() => setIsDeleteDialogOpen(false)} disabled={loading}>
							Cancel
						</Button>
						<Button variant='destructive' onClick={handleDelete} disabled={loading}>
							{loading && (
								<AiOutlineLoading3Quarters
									className='animate-spin mr-2'
									size={16}
								/>
							)}
							Delete Workspace
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
