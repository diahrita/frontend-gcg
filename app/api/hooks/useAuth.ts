'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useAuth = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = sessionStorage.getItem('token');
            if (token) {
                setIsAuthenticated(true);
                // Redirect to home if already authenticated
                router.push('/'); // Redirect ke halaman utama jika sudah login
            } else {
                setIsAuthenticated(false);
                router.push('/auth/login'); // Redirect ke login jika belum login
            }
            setLoading(false);
        };

        checkAuth();
    }, [router]);

    return { loading, isAuthenticated };
};

export default useAuth;
