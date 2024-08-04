import { Metadata } from 'next';
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
        images: [`/layout/images/tps.png`],
        ttl: 604800
    },
    icons: {
        icon: [`/layout/images/pelindo.png`]
    }
};

export default function AppLayout({ children }: AppLayoutProps) {
    return <Layout>{children}</Layout>;
}
