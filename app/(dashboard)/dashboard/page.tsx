import { createWorkspace, getWorkspaces } from '@/app/actions/workspace';
import { AppSidebar } from '@/components/dashboard/sidebar';
import { TopBar } from '@/components/dashboard/top-bar';
import { WorkspaceGrid } from '@/components/dashboard/workspace-grid';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function DashboardPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	const user = session?.user;
	// console.log(user);

	const workspaces = await getWorkspaces();

	return (
		<div className='flex h-dvh bg-background'>
			<AppSidebar user={user} workspaces={workspaces} />

			<div className='flex min-w-0 flex-1 flex-col'>
				<TopBar title={user?.name} />
				<main className='flex-1 overflow-y-auto bg-dot-grid px-4 py-8 sm:px-8'>
					<div className='mx-auto max-w-5xl'>
						<div className='mb-8'>
							<h1 className='text-2xl font-semibold tracking-tight text-foreground sm:text-3xl'>
								Welcome back, {user?.name}
							</h1>
							<p className='mt-1.5 text-muted-foreground'>
								Jump back into a workspace or start something new.
							</p>
						</div>

						<div className='mb-6 flex items-center justify-between'>
							<h2 className='text-sm font-medium text-foreground'>
								Recent workspaces
							</h2>
						</div>
						<WorkspaceGrid workspaces={workspaces} />
					</div>
				</main>
			</div>
		</div>
	);
}
