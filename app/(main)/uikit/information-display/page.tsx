'use client';

import Link from 'next/link';
import { Button } from 'primereact/button';
import React, { useState } from 'react';

const InformationDisplay = () => {
    return (
        <>
            <div className="card">
                <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center mb-4">
                    <h5 className="m-0">Display Information</h5>
                    <div className="flex justify-between items-center mt-2 md:mt-0">
                        <Button label="New" icon="pi pi-plus" severity="success" className="mr-2" />
                    </div>
                </div>
                <div className="grid">
                    <div className="col-12 lg:col-6 xl:col-3">
                        <Link href="/uikit/soal">
                            <div className="card mb-0" style={{ cursor: 'pointer' }}>
                                <div className="justify-between items-center">
                                    <div>
                                        <div className="text-900 font-medium text-xl mb-2">Event</div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-12 lg:col-6 xl:col-3">
                        <Link href="/uikit/soal">
                            <div className="card mb-0" style={{ cursor: 'pointer' }}>
                                <div className="flex justify-content-between">
                                    <div>
                                        <div className="text-900 font-medium text-xl mb-2">Informasi</div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InformationDisplay;
