'use client';

import useAuth from '@/app/api/hooks/useAuth';
import Loading from '@/app/components/Loading';
import { Metadata } from 'next';
import { useEffect } from 'react';
import Layout from '../../layout/layout';

interface AppLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'SIMGO',
    description: 'Sistem Informasi Manajemen Good Corporate Governance',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },
    openGraph: {
        type: 'website',
        title: 'SIMGO',
        url: 'https://sakai.primereact.org/',
        description: 'Sistem Informasi Manajemen Good Corporate Governance',
        images: ['https://www.primefaces.org/static/social/sakai-react.png'],
        ttl: 604800
    },
    icons: {
        icon: '/favicon.ico'
    }
};

export default function AppLayout({ children }: AppLayoutProps) {
    const { loading, isAuthenticated } = useAuth();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('lastVisitedPage', window.location.pathname);
        }
    }, []); 

    if (loading) {
        return <Loading />;
    }

    if (!isAuthenticated) {
       
        return <Loading />; 
    }

    return <Layout>{children}</Layout>;
}
