/* eslint-disable @next/next/no-img-element */

import { AppTopbarRef } from '@/types';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Sidebar } from 'primereact/sidebar';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const [visibleRight, setVisibleRight] = useState(false);
    const [visibleConfirmDialog, setVisibleConfirmDialog] = useState(false);
    const [profile, setProfile] = useState<{ email: string; username: string } | null>(null);
    const toast = useRef<Toast>(null);
    
    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    useEffect(() => {
        const storedProfile = sessionStorage.getItem('profile');
        if (storedProfile) {
            setProfile(JSON.parse(storedProfile));
        }
    }, []);

    const handleLogout = () => {
        // Clear sessionStorage
        sessionStorage.clear();
        
        // Optionally clear localStorage if you use it
        localStorage.clear();

        // Redirect user to login page or home page
        window.location.href = '/auth/login';  
    };

    const accept = () => {
        handleLogout();
        toast.current?.show({ severity: 'info', summary: 'Logged out', detail: 'You have successfully logged out', life: 3000 });
    };

    const reject = () => {
        toast.current?.show({ severity: 'warn', summary: 'Logout cancelled', detail: 'You have cancelled the logout', life: 3000 });
    };

    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                <img src={`/layout/images/tps.png`} width="80px" height={'65px'} alt="logo" />
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <div className="mx-2"></div>
                <div className="flex gap-2 justify-content-center">
                    <Button icon="pi pi-user" onClick={() => setVisibleRight(true)} />
                </div>

                <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                    <div className="flex flex-wrap justify-content-center gap-3 mb-4">
                        <i className="pi pi-user" style={{ fontSize: '2.5rem', color: 'slateblue' }}></i>
                    </div>

                    <div className="text-center">
                        <h4 className="mb-1">{profile?.username || '-'}</h4>
                        <p className="mt-1">{profile?.email || 'Email not found'}</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px', marginTop: '12px' }}>
                        <Button style={{ width: '100px', height: '40px', marginBottom: '4px' }} label="Edit" icon="pi pi-user-edit" severity="info" aria-label="User"/>

                        <Toast ref={toast} />
                        <ConfirmDialog visible={visibleConfirmDialog} onHide={() => setVisibleConfirmDialog(false)} message="Are you sure you want to logout?" header="Logout" icon="pi pi-sign-out" accept={accept} reject={reject} />

                        <Button style={{ width: '100px', height: '40px', marginTop: '4px' }} onClick={() => setVisibleConfirmDialog(true)} icon="pi pi-check" label="Logout" severity="danger" />
                    </div>
                </Sidebar>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
