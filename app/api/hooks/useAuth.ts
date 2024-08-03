import { Messages } from '@/app/hendlererror/message/messages';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useAuth = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
     
        const saveCurrentPage = () => {
            sessionStorage.setItem('lastVisitedPage', window.location.pathname);
        };

        const checkAuth = () => {
            const token = sessionStorage.getItem(Messages.TOKEN);
            const lastVisitedPage = sessionStorage.getItem('lastVisitedPage') || '/';
            const defaultPage = '/'; 
            if (token) {
                setIsAuthenticated(true);

                router.push(lastVisitedPage);
            } else {
                setIsAuthenticated(false);
                router.push('/auth/login');
            }
            setLoading(false);
        };
        saveCurrentPage();
        checkAuth();
        window.addEventListener('popstate', saveCurrentPage);

        return () => {
            window.removeEventListener('popstate', saveCurrentPage);
        };
    }, [router]);

    return { loading, isAuthenticated };
};

export default useAuth;
