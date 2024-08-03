/* eslint-disable @next/next/no-img-element */

import { AppTopbarRef } from '@/types';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Sidebar } from 'primereact/sidebar';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react';
import { LayoutContext } from './context/layoutcontext';


const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const [visibleRight, setVisibleRight] = useState(false);
    const [visibleConfirmDialog, setVisibleConfirmDialog] = useState(false);
    const toast = useRef<Toast>(null);


    

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    const accept = () => {
        toast.current?.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    };

    const reject = () => {
        toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
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
                        <h4 className="mb-1">Admin</h4>
                        <p className="mt-1">admin@gmail.com</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px', marginTop: '12px' }}>
                        <Button style={{ width: '100px', height: '40px', marginBottom: '4px' }} label="Edit" icon="pi pi-user-edit" severity="info" aria-label="User"/>

                        <Toast ref={toast} />
                        <ConfirmDialog visible={visibleConfirmDialog} onHide={() => setVisibleConfirmDialog(false)} message="Anda yakin ingin logout?" header="Logout" icon="pi pi-sign-out" accept={accept} reject={reject} />

                        <Button style={{ width: '100px', height: '40px', marginTop: '4px' }} onClick={() => setVisibleConfirmDialog(true)} icon="pi pi-check" label="Logout" severity="danger" />
                    </div>

                    
                </Sidebar>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
