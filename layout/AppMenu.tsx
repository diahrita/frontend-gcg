/* eslint-disable @next/next/no-img-element */

import { AppMenuItem } from '@/types';
import { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
                { label: 'Form Klaim', icon: 'pi pi-fw pi-file', to: '/uikit/klaim' }
            ]
        },
        {
            label: 'Asissment',
            items: [
                {
                    label: 'Penilaian',
                    icon: 'pi pi-fw pi-file-edit',
                    items: [
                        {
                            label: 'Aspek Penilaian',
                            icon: 'pi pi-fw pi-file',
                            to: '/uikit/aspek-penilaian'
                        },
                        {
                            label: 'Kategori Penilaian',
                            icon: 'pi pi-fw pi-file',
                            to: '/uikit/kategori-penilaian'
                        }
                    ]
                },
                { label: 'Bank Soal', icon: 'pi pi-fw pi-folder-open', to: '/uikit/bank-soal' }
            ]
        },
        {
            label: 'Pengaturan',
            items: [
                {
                    label: 'Data Admin',
                    icon: 'pi pi-fw pi-users',
                    to: '/uikit/data-admin'
                }
            ]
        },
        {
            label: 'Pages',
            icon: 'pi pi-fw pi-briefcase',
            to: '/pages',
            items: [
                {
                    label: 'Login',
                    icon: 'pi pi-fw pi-sign-in',
                    to: '/auth/login'
                },
                {
                    label: 'Register',
                    icon: 'pi pi-fw pi-sign-in',
                    to: '/auth/register'
                },
                {
                    label: 'Icons',
                    icon: 'pi pi-fw pi-prime',
                    to: '/utilities/icons'
                }
              
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
