'use client';

import Head from "next/head";
import Link from 'next/link';
import { Badge } from 'primereact/badge';
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

const Dashboard = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [codeAlat, setCodeAlat] = useState<string>('');
    const [nipp, setNipp] = useState<string>('');

    return (
        <>
        <Head>
            <title>SIMGO</title>
            <meta name="description" content="Sistem Informasi Manajemen Good Corporate Governance" />
        </Head>
        <div className="card">
            <h4>Bank Soal</h4>
            <div className="grid">
                <div className="col-12">
                    <div className="card mb-0">
                        <div className="flex justify-content-between">
                            <div>
                                <div className="text-900 font-medium text-xl mb-2">Pemeriksaan Area Kerja</div>
                                <span className="block text-500 font-medium">AreaKerjaRTG</span>
                            </div>
                            <Button icon="pi pi-search" onClick={() => setVisible(true)} />
                            <Dialog header="Cari Soal" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                                <div className="p-fluid">
                                    <div className="field">
                                        <label htmlFor="code_alat" className="font block mb-2">Kode Soal</label>
                                        <InputText id="code_alat" type="text" value={codeAlat} onChange={(e) => setCodeAlat(e.target.value)} className="w-full" />
                                    </div>

                                    <div className="field">
                                        <label htmlFor="nipp" className="font block mb-2">NIPP</label>
                                        <InputText id="nipp" keyfilter="int" value={nipp} onChange={(e) => setNipp(e.target.value)} className="w-full" />
                                    </div>
                                    
                                    <div className="field">
                                        <Button label="Cari" className="w-full"></Button>
                                    </div>
                                </div>
                            </Dialog>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="card mb-0">
                        <div className="flex justify-content-between">
                            <div>
                                <div className="text-900 font-medium text-xl mb-2">Cabin Check</div>
                                <span className="block text-500 font-medium">CCCabinRTG</span>
                            </div>
                            <Button icon="pi pi-search" onClick={() => setVisible(true)} />
                            <Dialog header="Cari Soal" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                                <div className="p-fluid">
                                    <div className="field">
                                        <label htmlFor="code_alat" className="font block mb-2">Kode Soal</label>
                                        <InputText id="code_alat" type="text" value={codeAlat} onChange={(e) => setCodeAlat(e.target.value)} className="w-full" />
                                    </div>

                                    <div className="field">
                                        <label htmlFor="nipp" className="font block mb-2">NIPP</label>
                                        <InputText id="nipp" keyfilter="int" value={nipp} onChange={(e) => setNipp(e.target.value)} className="w-full" />
                                    </div>
                                    
                                    <div className="field">
                                        <Button label="Cari" className="w-full"></Button>
                                    </div>
                                </div>
                            </Dialog>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="card mb-0">
                        <div className="flex justify-content-between">
                            <div>
                                <div className="text-900 font-medium text-xl mb-2">Pemeriksaan Fungsi dan Kondisi RTG</div>
                                <span className="block text-500 font-medium">KondisiFungsiRTG</span>
                            </div>
                            <Button icon="pi pi-search" onClick={() => setVisible(true)} />
                            <Dialog header="Cari Soal" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                                <div className="p-fluid">
                                    <div className="field">
                                        <label htmlFor="code_alat" className="font block mb-2">Kode Soal</label>
                                        <InputText id="code_alat" type="text" value={codeAlat} onChange={(e) => setCodeAlat(e.target.value)} className="w-full" />
                                    </div>

                                    <div className="field">
                                        <label htmlFor="nipp" className="font block mb-2">NIPP</label>
                                        <InputText id="nipp" keyfilter="int" value={nipp} onChange={(e) => setNipp(e.target.value)} className="w-full" />
                                    </div>
                                    
                                    <div className="field">
                                    <Link href="/uikit/soal" legacyBehavior>
                                        <Button label="Cari" className="w-full"></Button>
                                    </Link>
                                    </div>
                                </div>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Dashboard;
