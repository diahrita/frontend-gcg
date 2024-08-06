'use client';

import useAuth from '@/app/api/hooks/useAuth';
import Loading from '@/app/components/Loading';
import Head from 'next/head';
import { useEffect } from 'react';
import Layout from '../../layout/layout';

interface AppLayoutProps {
    children: React.ReactNode;
}

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

    return (
        <>
            <Head>
                <title>SIMGO</title>
                <meta name="description" content="Sistem Informasi Manajemen Good Corporate Governance" />
                <meta name="robots" content="noindex, nofollow" />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="SIMGO" />
                <meta property="og:url" content="https://sakai.primereact.org/" />
                <meta property="og:description" content="Sistem Informasi Manajemen Good Corporate Governance" />
                <meta property="og:image" content="https://www.primefaces.org/static/social/sakai-react.png" />
                <meta property="og:ttl" content="604800" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>{children}</Layout>
        </>
    );
}
