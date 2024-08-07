'use client';

import { bankAssessment } from '@/app/api/assesment/bankAssessment';
import { Demo } from '@/types';
import { LabelAndGroup } from '@/types/assessment';
import Link from 'next/link';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog'; // Import Dialog
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils'; // Import classNames
import React, { useEffect, useRef, useState } from 'react';

const Crud = () => {


    const [data, setData] = useState<LabelAndGroup[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    const fetchLabelsAndGroups = async () => {
        setLoading(true);
        try {
            // Ambil nilai dari sessionStorage
            const codeAlat = sessionStorage.getItem('codeAlat');
            const nipp = sessionStorage.getItem('nipp');

            // Validasi jika nilai tidak ditemukan
            if (!codeAlat || !nipp) {
                setLoading(false);
                return;
            }

            const result = await bankAssessment(codeAlat, nipp);

            if (result.successCode === 200 && result.data) {
                setData(result.data);
                console.log("Ini data", result.data);
            } else {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to fetch data', life: 3000 });
            }
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'An error occurred', life: 3000 });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLabelsAndGroups();
    }, []);

    let emptyBankSoal: Demo.BankSoal = {
        header_id: 0,
        label: '',
        grup: '',
    };

    const [isEditMode, setIsEditMode] = useState(false);
    const [banksoals, setBankSoals] = useState<Demo.BankSoal[]>([]);
    const [banksoalDialog, setBankSoalDialog] = useState(false);
    const [banksoal, setBankSoal] = useState<Demo.BankSoal>(emptyBankSoal);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);

    const dt = useRef<DataTable<any>>(null);



    const openNew = () => {
        setBankSoal(emptyBankSoal);
        setSubmitted(false);
        setBankSoalDialog(true);
        setIsEditMode(false);
    };

    const hideDialog = () => {
        setBankSoalDialog(false);
    };

    const saveBankSoal = () => {
        setSubmitted(true);

        if (banksoal.label && banksoal.label.trim() && banksoal.grup && banksoal.grup.trim()) {
            let _banksoals = [...banksoals]; // Tidak perlu fallback ke array kosong karena tipe data sudah pasti array
            if (isEditMode) {
                const index = _banksoals.findIndex(bs => bs.header_id === banksoal.header_id);
                _banksoals[index] = banksoal;
            } else {
                banksoal.header_id = banksoals.length + 1;
                _banksoals.push(banksoal);
            }

            setBankSoals(_banksoals);
            setBankSoalDialog(false);
            setBankSoal(emptyBankSoal);
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Bank Soal Saved', life: 3000 });
        }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _banksoal = { ...banksoal };
        // @ts-ignore
        _banksoal[`${name}`] = val;
        setBankSoal(_banksoal);
    };

    const DialogFooter = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={hideDialog} className="p-button-text" />
            <Button label="Save" icon="pi pi-check" onClick={saveBankSoal} autoFocus />
        </div>
    );


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
                            <Button label="New" icon="pi pi-plus" severity="success" className="mr-2" onClick={openNew} />
                        </div>
                    </div>


                    <div className="grid">
                        {loading}

                        {data ? (
                            data.map((item, index) => (
                                <div className="col-12" key={index}>
                                    <Link href="/uikit/soal">
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
                            <div>{error || 'Loading data...'}</div>
                        )}
                    </div>
                </div>
                <Dialog visible={banksoalDialog} style={{ width: '450px' }} header="Tambah Bank Soal" modal className="p-fluid" footer={DialogFooter} onHide={hideDialog}>
                    <div className="field">
                        <label htmlFor="label">Label</label>
                        <InputText
                            id="label"
                            value={banksoal.label || ''}
                            onChange={(e) => onInputChange(e, 'label')}
                            required
                            autoFocus
                            className={classNames({ 'p-invalid': submitted && !banksoal.label })}
                        />
                        {submitted && !banksoal.label && <small className="p-error">Label is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="grup">Grup</label>
                        <InputText
                            id="grup"
                            value={banksoal.grup !== undefined ? banksoal.grup.toString() : ''}
                            onChange={(e) => onInputChange(e, 'grup')}
                            required
                            className={classNames({ 'p-invalid': submitted && !banksoal.grup })}
                        />
                        {submitted && !banksoal.grup && <small className="p-error">Grup is required.</small>}
                    </div>
                </Dialog>
            </>
        );
    };

    return <Dashboard />;
};

export default Crud;
