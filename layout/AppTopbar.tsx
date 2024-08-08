import { stopTokenRefresh } from '@/app/api/data/jwtToken';
import { Messages } from '@/app/hendlererror/message/messages';
import { AppTopbarRef } from '@/types';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
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
    const [profile, setProfile] = useState<{ email: string; type_user: string } | null>(null);

    const toast = useRef<Toast>(null);
    const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

        const checkToken = () => {
            const token = sessionStorage.getItem(Messages.TOKEN);
            if (!token) {
                toast.current?.show({ severity: 'warn', summary: 'Session Berakhir!', detail: 'Session Anda telah berakhir. Anda akan diarahkan ke halaman login.', life: 3000 });
                handleLogout();
            }
        };

        const handleUserActivity = () => {
            if (idleTimeoutRef.current) {
                clearTimeout(idleTimeoutRef.current);
            }
            idleTimeoutRef.current = setTimeout(() => {
                handleLogout();
            }, 15 * 60 * 1000); // 15 minutes timeout
        };

        // Check token every minute
        const tokenCheckInterval = setInterval(checkToken, 60 * 1000); // 1 minute interval

        // Add event listeners
        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('keydown', handleUserActivity);
        window.addEventListener('scroll', handleUserActivity);

        // Clean up event listeners and interval on component unmount
        return () => {
            if (idleTimeoutRef.current) {
                clearTimeout(idleTimeoutRef.current);
            }
            clearInterval(tokenCheckInterval);
            window.removeEventListener('mousemove', handleUserActivity);
            window.removeEventListener('keydown', handleUserActivity);
            window.removeEventListener('scroll', handleUserActivity);
        };
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
        stopTokenRefresh();
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = '/auth/login';
    };

    const accept = () => {
        handleLogout();
        toast.current?.show({ severity: 'info', summary: 'Logged out', detail: 'You have successfully logged out', life: 3000 });
    };

    const reject = () => {
        toast.current?.show({ severity: 'warn', summary: 'Logout cancelled', detail: 'You have cancelled the logout', life: 3000 });
    };

    const menuRight = useRef<Menu>(null);
    const items: MenuItem[] = [
        {
            template: () => (
                <div className="flex flex-column align-items-center py-2 px-2">
                     <img src={getImageSrc()} width="45px" height={'45px'} alt="profile" />
                    <div className="text-center mt-2">
                        <span className="font-bold mb-1">{profile?.type_user || '-'}</span>
                        <br></br>
                        <p>{profile?.email || 'Email not found'}</p>
                    </div>
                </div>
            )
        },
        {
            separator: true
        },
        {
            template: () => (
                <Link href="/uikit/edit-profile" legacyBehavior>
                    <a className="p-menuitem-link">
                        <span className="p-menuitem-icon pi pi-user-edit"></span>
                        <span className="p-menuitem-text">Edit</span>
                    </a>
                </Link>
            )
        },
        {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => setVisibleConfirmDialog(true)
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
                    <Toast ref={toast} />
                    <Menu className='card flex-column align-items-center py-2 px-2' model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
                    <Button icon="pi pi-user" className="mr-2" onClick={(event) => menuRight.current?.toggle(event)} aria-controls="popup_menu_right" aria-haspopup />
                </div>
            </div>

            <ConfirmDialog visible={visibleConfirmDialog} onHide={() => setVisibleConfirmDialog(false)} message="Are you sure you want to logout?" header="Logout" icon="pi pi-sign-out" accept={accept} reject={reject} />
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;