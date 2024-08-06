'use client';

import { bankAssessment } from "@/app/api/assesment/bankAssessment";
import { Messages } from "@/app/hendlererror/message/messages";
import { Assessment } from "@/types/assessment";
import Head from "next/head";
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [codeAlat, setCodeAlat] = useState<string>('RTG-22');
    const [nipp, setNipp] = useState<string>('8606120200');
    const [data, setData] = useState<Assessment[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        console.log('Fetching data...');
        try {
            const result = await bankAssessment(codeAlat, nipp); // Call your API function
            console.log('API Response:', result); 
            
            // Check if the successCode is 200
            if (result.successCode === 200 && result.data) {
                console.log('Data received from API:', result.data);
                setData(result.data);
                setError(null); // Clear any previous error
            } else {
                console.log('Unexpected successCode or no data:', result.successCode);
                setError(Messages.GENERIC_ERROR);
            }
        } catch (err) {
            console.error('Error occurred in fetchData:', err);
            setError('An unexpected error occurred');
        }
    };

    useEffect(() => {
        fetchData(); // Call fetchData once on component mount
    }, [codeAlat, nipp]); // Dependencies to re-fetch when codeAlat or nipp changes


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
