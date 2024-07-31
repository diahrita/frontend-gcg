/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';

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
            label: 'Survey',
            items: [
                {
                    label: 'Aspek Penilaian',
                    icon: 'pi pi-fw pi-file-edit',
                    items: [
                        {
                            label: 'Aspek I',
                            icon: 'pi pi-fw pi-file',
                            to: '/uikit/aspek-penilaian'
                        }
                        // {
                        //     label: 'Aspek II',
                        //     icon: 'pi pi-fw pi-file',
                        //     to: '/uikit/table'
                        // },
                        // {
                        //     label: 'Aspek III',
                        //     icon: 'pi pi-fw pi-file',
                        //     to: '/uikit/table'
                        // },
                        // {
                        //     label: 'Aspek IV',
                        //     icon: 'pi pi-fw pi-file',
                        //     to: '/uikit/table'
                        // }
                    ]
                },
                { label: 'Kategori Penilaian', icon: 'pi pi-fw pi-list', to: '/uikit/kategori-penilaian' },
                { label: 'Bank Soal', icon: 'pi pi-fw pi-folder-open', to: '/uikit/bank-soal' }
                // { label: 'Survey', icon: 'pi pi-fw pi-clone', to: '/uikit/survey' },
                // { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
                // { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
                // { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
                // { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
                // { label: 'Overlay', icon: 'pi pi-fw spi-clone', to: '/uikit/overlay' },
                // { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
                // { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu', preventExact: true },
                // { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' }
            ]
        },
        {
            label: 'Pengaturan',
            items: [
                {
                    label: 'Data User',
                    icon: 'pi pi-fw pi-users',
                    to: '/uikit/survey'
                }
            ]
        },
        {
            label: 'Pages',
            icon: 'pi pi-fw pi-briefcase',
            to: '/pages',
            items: [
                // {
                //     label: 'Auth',
                //     icon: 'pi pi-fw pi-user',
                //     items: [
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
                // {
                //     label: 'Error',
                //     icon: 'pi pi-fw pi-times-circle',
                //     to: '/auth/error'
                // },
                // {
                //     label: 'Access Denied',
                //     icon: 'pi pi-fw pi-lock',
                //     to: '/auth/access'
                // }
                //     ]
                // },
                // {
                //     label: 'Crud',
                //     icon: 'pi pi-fw pi-pencil',
                //     to: '/pages/crud'
                // }
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
