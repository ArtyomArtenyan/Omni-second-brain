import { getWorkspace, getWorkspaces } from '@/app/actions/workspace';
import { AppSidebar } from '@/components/dashboard/sidebar';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

export default async function WorkspacePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const session = await auth.api.getSession({
		headers: await headers(),
	});
	const user = session?.user;

	const workspace = await getWorkspace(id);

	if (!workspace) notFound();
	const workspaces = await getWorkspaces();

	return (
		<div className='flex h-dvh bg-background'>
			<AppSidebar user={user} workspaces={workspaces} />
			<div className='flex min-w-0 flex-1 flex-col'>
				<header className='flex h-16 shrink-0 items-center gap-3 border-b border-border px-4 sm:px-6'>
					<span
						className='size-3 rounded-sm'
						style={{ backgroundColor: workspace.color }}
					/>
					<div className='min-w-0'>
						<h1 className='truncate text-sm font-semibold text-foreground'>
							{workspace.name}
						</h1>
					</div>
				</header>
			</div>
		</div>
	);
}
