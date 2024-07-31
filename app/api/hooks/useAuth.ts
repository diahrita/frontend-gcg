'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useAuth = () => {
    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        
        if (!token) {
            router.push('/auth/login');
        }
    }, [router]);
};

export default useAuth;
