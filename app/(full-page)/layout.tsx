
import { Metadata } from 'next';

import React from 'react';
import AppConfig from '../../layout/AppConfig';

interface SimpleLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'SIMGO',
    description: 'Sistem Informasi Manajemen Good Corporate Governance'
};

export default function SimpleLayout({ children }: SimpleLayoutProps) {
  

    return (
        <React.Fragment>
            {children}
            <AppConfig simple />
        </React.Fragment>
    );
}
