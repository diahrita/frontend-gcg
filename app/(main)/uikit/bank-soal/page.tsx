'use client';

import { cekAssessment } from '@/app/api/assesment/cekAssessment';
import { Messages } from '@/app/hendlererror/message/messages';
import { LabelAndGroup } from '@/types/assessment';
import Link from 'next/link';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';

const BankSoal = () => {
    const [data, setData] = useState<LabelAndGroup[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleLinkClick = (headerId: number, title: string) => {
        sessionStorage.setItem('header_id', headerId.toString());
        sessionStorage.setItem('title', title);
    };

    const fetchLabelsAndGroups = async () => {
        setLoading(true);
        try {
            const code_alat = sessionStorage.getItem('codeAlat');
            const nipp = sessionStorage.getItem('nipp');
            if (!code_alat || !nipp) {
                setLoading(false);
                return;
            }
            const result = await cekAssessment(code_alat, nipp);
            if (result.successCode === 200 && result.data) {
                setData(result.data);
                console.log("Ini data", result.data);
            } else {
                const storedError = sessionStorage.getItem(Messages.ERROR);
                setError(storedError || Messages.GENERIC_ERROR);
            }
        } catch (error) {
            const storedError = sessionStorage.getItem(Messages.ERROR);
            setError(storedError || Messages.GENERIC_ERROR);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLabelsAndGroups();
    }, []);

    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);



    const Dashboard = () => {
        return (
            <>
                <div className="card">
                    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center mb-4">
                        <h5 className="m-0">Bank Soal</h5>
                        <div className="flex justify-between items-center mt-2 md:mt-0">
                            <span className="block mt-2 md:mt-0 p-input-icon-left mr-4">
                                <i className="pi pi-search" />
                                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
                            </span>
                            <Button label="New" icon="pi pi-plus" severity="success" className="mr-2" />
                        </div>
                    </div>

                    <div className="grid">
                        {loading ? (
                            <div className="text-center">{Messages.BUTTON_LOADING_TEXT}</div>
                        ) : error ? (
                            <div>{error}</div>
                        ) : data.length > 0 ? (
                            data.map((item, index) => (
                                <div className="col-12" key={index}>
                                    <Link
                                        href={`/uikit/soal?header_id=${item.header_id}`}
                                        onClick={() => handleLinkClick(item.header_id, item.label)}
                                    >
                                        <div className="card mb-0" style={{ cursor: 'pointer' }}>
                                            <div className="flex justify-content-between">
                                                <div>
                                                    <div className="text-900 font-medium text-xl mb-2">
                                                        {item.label}
                                                    </div>
                                                    <span className="block text-500 font-medium">
                                                        {item.grup}
                                                    </span>
                                                </div>
                                                <Badge value="6" size="xlarge" severity="warning"></Badge>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div>{Messages.ALERT_WARNING}</div>
                        )}
                    </div>
                </div>
            </>
        );
    };

    return <Dashboard />;
};

export default BankSoal;
