import { WorkspaceHeader } from '@/app/(dashboard)/dashboard/workspace-header';
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
				<WorkspaceHeader workspace={workspace} key={workspace.id} />
			</div>
		</div>
	);
}
