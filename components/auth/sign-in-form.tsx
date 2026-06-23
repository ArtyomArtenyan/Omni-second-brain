'use client';
import { useState, type FormEvent } from 'react';
// import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function SignInForm() {
	const [loading, setLoading] = useState(false);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		setLoading(true);
	}

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
			<div className='flex flex-col gap-2'>
				<Label htmlFor='email'>Email</Label>
				<Input
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
				Sign In
			</Button>
		</form>
	);
}
