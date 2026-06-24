'use client';
import { usePathname } from 'next/navigation';
import React from 'react';

const page = () => {
	const pathname = usePathname();
	console.log(pathname);
	return <div>page</div>;
};

export default page;
