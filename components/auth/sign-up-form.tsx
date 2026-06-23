'use client';

import { useState, type FormEvent } from 'react';
// import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth/client';
import { useRouter } from 'next/navigation';

export function SignUpForm() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const { data, error } = await authClient.signUp.email({
			name,
			email,
			password,
		});

		console.log('data:', data);
		console.log('error:', error);
		if (error) {
			console.log(error);
			return;
		}

		router.push('/dashboard');
	}

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
			<div className='flex flex-col gap-2'>
				<Label htmlFor='name'>Name</Label>
				<Input
					value={name}
					onChange={e => setName(e.target.value)}
					id='name'
					type='text'
					placeholder='Ada Lovelace'
					required
					className='h-10'
				/>
			</div>
			<div className='flex flex-col gap-2'>
				<Label htmlFor='email'>Email</Label>
				<Input
					value={email}
					onChange={e => setEmail(e.target.value)}
					id='email'
					type='email'
					placeholder='you@example.com'
					required
					className='h-10'
				/>
			</div>
			<div className='flex flex-col gap-2'>
				<Label htmlFor='password'>Password</Label>
				<Input
					value={password}
					onChange={e => setPassword(e.target.value)}
					id='password'
					type='password'
					placeholder='••••••••'
					required
					className='h-10'
				/>
			</div>
			<Button
				type='submit'
				disabled={loading}
				className='gradient-violet glow-sm mt-2 h-10 text-primary-foreground'
			>
				{/* {loading && <Loader2 className='size-4 animate-spin' />} */}
				Create Account
			</Button>
		</form>
	);
}
