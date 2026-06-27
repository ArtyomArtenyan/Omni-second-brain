'use server';

import { prisma } from '@/lib/auth';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function createWorkspace(name: string, description?: string) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) throw new Error('Unauthorized');

	const workspace = await prisma.workspace.create({
		data: {
			name,
			description,
			userId: session.user.id,
		},
	});

	revalidatePath('/dashboard');
	return workspace;
}
export async function getWorkspaces() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) throw new Error('Unauthorized');

	const workspace = await prisma.workspace.findMany({
		where: { userId: session.user.id },
		orderBy: { createdAt: 'desc' },
	});

	return workspace;
}

export async function getWorkspace(id: string) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) throw new Error('Unauthorized');

	const workspace = await prisma.workspace.findFirst({
		where: {
			id,
			userId: session.user.id,
		},
	});

	return workspace;
}

export async function updateWorkspace(
	id: string,
	name: string,
	color?: string,
	description?: string,
) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) throw new Error('Unauthorized');

	const workspace = await prisma.workspace.update({
		where: {
			id,
			userId: session.user.id,
		},

		data: {
			name,
			description,
			color,
		},
	});

	revalidatePath('/dashboard');
	revalidatePath(`/workspace/${id}`);

	return workspace;
}

export async function deleteWorkspace(id: string) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) throw new Error('Unauthorized');

	const workspace = await prisma.workspace.delete({
		where: {
			id,
			userId: session.user.id,
		},
	});

	revalidatePath('/dashboard');
	revalidatePath(`/workspace/${id}`);

	return workspace;
}

