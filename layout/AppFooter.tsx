/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <img src={`/layout/images/tps.png`} alt="Logo" height="30" className="mr-2" />
            <span className="font-medium">&copy; <a>2024</a>, All Right Reserved. </span>
        </div>
        
        
    );
};

export default AppFooter;
