'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const useAuth = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = sessionStorage.getItem('token');
            if (token) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                router.push('/auth/login');
            }
            setLoading(false);
        };

        checkAuth();
    }, [router]);

    return { loading, isAuthenticated };
};

export default useAuth;
