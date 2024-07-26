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

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

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
                <div className="flex flex-wrap justify-content-center gap-3 mb-4 mt-3">
                <Button icon="pi pi-user-edit" severity="info" aria-label="User" />
                <Button icon="pi pi-sign-out" severity="danger" aria-label="User" />
                </div>
                </Sidebar>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
