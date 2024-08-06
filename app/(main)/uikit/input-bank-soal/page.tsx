'use client';

import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Link from 'next/link';

const InputBankSoal = () => {
  const [codeAlat, setCodeAlat] = useState<string>('');
  const [nipp, setNipp] = useState<string>('');

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Silahkan Masukkan Kode Alat dan NIPP</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6 mt-2">
                            <label htmlFor="code_alat">Kode Alat</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-wrench"></i>
                                </span>
                                <InputText id="code_alat" type="text" value={codeAlat} onChange={(e) => setCodeAlat(e.target.value)} className="w-full"/>
                            </div>
                        </div>
                        <div className="field col-12 md:col-6 mt-2">
                            <label htmlFor="nipp">NIPP</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-key"></i>
                                </span>
                                <InputText id="nipp" keyfilter="int" value={nipp} onChange={(e) => setNipp(e.target.value)} className="w-full"/>
                            </div>
                        </div>
                        
                        <Link href="/uikit/bank-soal" legacyBehavior>
                            <Button label="Submit" className="w-full mt-2"></Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputBankSoal;
