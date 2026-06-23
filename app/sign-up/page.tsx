import Link from 'next/link';
import { AuthShell } from '@/components/auth/auth-shell';
import { SignUpForm } from '@/components/auth/sign-up-form';

export default function SignUpPage() {
	return (
		<AuthShell
			title='Create your account'
			subtitle='Start building your second brain for free'
			footer={
				<>
					{'Already have an account? '}
					<Link
						href='/sign-in'
						className='font-medium text-primary transition-colors hover:text-primary/80'
					>
						Sign In
					</Link>
				</>
			}
		>
			<SignUpForm />
		</AuthShell>
	);
}
