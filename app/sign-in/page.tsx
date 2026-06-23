import { AuthShell } from '@/components/auth/auth-shell';
import { SignInForm } from '@/components/auth/sign-in-form';
import Link from 'next/link';
import React from 'react';

const SigninPage = () => {
	return (
		<div>
			<AuthShell
				title='Welcome back'
				subtitle='Sign in to continue to your second brain'
				footer={
					<>
						{"Don't have an account? "}
						<Link
							href='/sign-up'
							className='font-medium text-primary transition-colors hover:text-primary/80'
						>
							Register
						</Link>
					</>
				}
			>
				<SignInForm />
			</AuthShell>
		</div>
	);
};

export default SigninPage;
