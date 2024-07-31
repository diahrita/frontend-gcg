/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react';
import { AppTopbarRef } from '@/types';
import { LayoutContext } from './context/layoutcontext';
import { MegaMenu } from 'primereact/megamenu';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';

const megamenuItems = [
    {
        label: 'Profile',
        icon: 'pi pi-fw pi-user mr-2 text-2xl',
        items: [
            [
                {
                    label: 'Kids',
                    items: [{ label: 'Kids Item' }, { label: 'Kids Item' }]
                }
            ]
        ]
    },
];

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    const [visibleRight, setVisibleRight] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [visibleDialog, setVisibleDialog] = useState(false);
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

    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisibleDialog(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => setVisibleDialog(false)} autoFocus />
        </div>
    );
    const [text, setText] = useState<string>('');

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
                <div className="flex gap-3">
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search" />
                    </span>
                </div>
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
                        <Button style={{ width: '100px', height: '40px', marginBottom: '4px' }} label='Edit' icon="pi pi-user-edit" severity="info" aria-label="User" onClick={() => setVisibleDialog(true)} />
                        <Toast ref={toast} />
                        <ConfirmDialog visible={visibleConfirmDialog} onHide={() => setVisibleConfirmDialog(false)} message="Anda yakin ingin logout?" 
                            header="Logout" icon="pi pi-sign-out" accept={accept} reject={reject} />
                        <Button style={{ width: '100px', height: '40px', marginTop: '4px' }} onClick={() => setVisibleConfirmDialog(true)} icon="pi pi-check" label="Logout" severity="danger"/>
                    </div>
                    <Dialog header="Edit Profile" visible={visibleDialog} style={{ width: '50vw' }} onHide={() => setVisibleDialog(false)} footer={footerContent}>
                        <div className="card">
                            <div className="flex-auto">
                                <label htmlFor="email" className="font-bold block mb-2">
                                    Email
                                </label>
                                <InputText id="email" keyfilter="email" className="w-full" />
                            </div>
                            <Divider type="solid" />
                            {/* <div className="flex-auto mt-3 justify-between">
                                <label htmlFor="password" className="font-bold block mb-1">
                                    Password
                                </label>
                                <div className="flex items-center justify-between">
                                    <p className="m-0">Ubah Password.</p>
                                    <Button label="Ubah Password" severity="secondary" outlined size="small" className="ml-auto" />
                                </div>
                            </div>
                            <Divider type="solid" /> */}
                                <Inplace closable>
                                    <InplaceDisplay>{text || 'Ganti Password'}</InplaceDisplay>
                                    <InplaceContent>
                                        <InputText className="w-full mb-3" placeholder="Current Password" value={text} onChange={(e) => setText(e.target.value)} autoFocus />
                                        <InputText className="w-full mb-3" placeholder="New Password" value={text} onChange={(e) => setText(e.target.value)} autoFocus />
                                        <InputText className="w-full mb-3" placeholder="Confirm New Password" value={text} onChange={(e) => setText(e.target.value)} autoFocus />
                                    </InplaceContent>
                                </Inplace>
                            {/* <div className="flex-auto mt-3 justify-between">
                                <label htmlFor="password" className="font-bold block mb-1">
                                    Hapus Akun
                                </label>
                                <div className="flex items-center justify-between">
                                    <p className="m-0">Hapus permanen akun Anda.</p>
                                    <Button label="Hapus Akun" severity="secondary" outlined size="small" className="ml-auto" />
                                </div>
                            </div> */}
                        </div>
                    </Dialog>
                </Sidebar>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
