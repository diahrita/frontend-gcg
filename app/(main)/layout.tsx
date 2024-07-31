'use client';
import useAuth from '@/app/api/hooks/useAuth';
import { Metadata } from 'next';
import Layout from '../../layout/layout';
import { useRouter } from 'next/navigation';
import Loading from '@/app/components/Loading';

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
    const router = useRouter();

    if (loading) {
        return <Loading />;
    }

    if (!isAuthenticated) {
        return <Loading />;
    }
    
    return <Layout>{children}</Layout>;
}
