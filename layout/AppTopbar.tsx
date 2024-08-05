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
import { MegaMenu } from 'primereact/megamenu';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';

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
    }
];

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const [visibleRight, setVisibleRight] = useState(false);
    const [visibleConfirmDialog, setVisibleConfirmDialog] = useState(false);
    const [profile, setProfile] = useState<{ email: string; type_user: string } | null>(null);
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

    const getImageSrc = () => {
        if (profile?.type_user === 'PUBLIC') {
            return '/layout/images/public.png';
        } else if (profile?.type_user === 'TAMU') {
            return '/layout/images/guest.png';
        } else {
            return '/layout/images/user.png';
        }
    };

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = '/auth/login';
    };

    const accept = () => {
        handleLogout();
        toast.current?.show({ severity: 'info', summary: 'Logged out', detail: 'You have successfully logged out', life: 3000 });
    };

    const reject = () => {
        toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };

    // const footerContent = (
    //     <div>
    //         <Button label="No" icon="pi pi-times" onClick={() => setVisibleDialog(false)} className="p-button-text" />
    //         <Button label="Yes" icon="pi pi-check" onClick={() => setVisibleDialog(false)} autoFocus />
    //     </div>
    // );

    const [text, setText] = useState<string>('');

    const menuRight = useRef<Menu>(null);
    const items: MenuItem[] = [
        {
            template: () => {
                return (
                    <div className="">
                        <div className="flex flex-column align-items-center py-2 px-2">
                            <Avatar icon={'pi pi-user'} size="large" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} className="mr-2 mb-2" shape="circle" />
                            <div className="text-center">
                                <h5 className="mb-1">Admin</h5>
                                <span className="">admin@gmail.com</span>
                            </div>
                        </div>
                    </div>
                );
            }
        },
        {
            separator: true
        },
        {
            template: () => {
                return (
                    <Link href="/uikit/edit-profile" legacyBehavior>
                        <a className="p-menuitem-link">
                            <span className="p-menuitem-icon pi pi-user-edit"></span>
                            <span className="p-menuitem-text">Edit</span>
                        </a>
                    </Link>
                );
            }
        },
        {
            label: 'Logout',
            icon: 'pi pi-sign-out'
        }
    ];

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
                <div className="flex gap-2 justify-content-center">
                    <Toast ref={toast}></Toast>
                    <Menu className='card flex-column align-items-center py-2 px-2' model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
                    <Button icon="pi pi-user" className="mr-2" onClick={(event) => menuRight.current?.toggle(event)} aria-controls="popup_menu_right" aria-haspopup />
                </div>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
