'use client';
import { useState, type FormEvent } from 'react';
// import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { authClient } from '@/lib/auth/client';
import { useRouter } from 'next/navigation';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export function SignInForm() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);

		try {
			const { error } = await authClient.signIn.email({
				email,
				password,
			});

			if (error) {
				console.log(error);
				return;
			}

			router.push('/dashboard');
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
				<div className='flex items-center justify-between'>
					<Label htmlFor='password'>Password</Label>
					<a
						href='#'
						className='text-xs text-muted-foreground transition-colors hover:text-foreground'
					>
						Forgot password?
					</a>
				</div>
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
				{loading && (
					<AiOutlineLoading3Quarters className='animate-spin mr-2' size={16} />
				)}
				Sign In
			</Button>
		</form>
	);
}
