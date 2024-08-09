'use client';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import React from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { MenuItem } from 'primereact/menuitem';
import './style.css';
import './style.css';
import useInputBankSoalLogic from '@/app/api/assesment/logic/InputBankSoalLogic';

const InputBankSoalUI = () => {
    const {
        codeAlat,
        setCodeAlat,
        nipp,
        setNipp,
        error,
        loading,
        fetchData
    } = useInputBankSoalLogic();


    const items: MenuItem[] = [{ label: 'Input Kode Alat dan NIPP' }];
const home: MenuItem = { icon: 'pi pi-home', url: '/' }

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                <BreadCrumb model={items} home={home} className='mb-3' />
                    {error && <p className="error-message">{error}</p>}
                    <h5>Silahkan Masukkan Kode Alat dan NIPP</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6 mt-2">
                            <label htmlFor="code_alat">Kode Alat</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-wrench"></i>
                                </span>
                                <InputText 
                                    id="code_alat" 
                                    type="text" 
                                    value={codeAlat} 
                                    onChange={(e) => setCodeAlat(e.target.value)} 
                                    className={`w-full ${error && !codeAlat ? 'p-invalid' : ''}`} 
                                    placeholder={error && !codeAlat ? 'Kode Alat harus diisi' : 'Masukkan Kode Alat'}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <div className="field col-12 md:col-6 mt-2">
                            <label htmlFor="nipp">NIPP</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-key"></i>
                                </span>
                                <InputText 
                                    id="nipp" 
                                    keyfilter="int" 
                                    value={nipp} 
                                    onChange={(e) => setNipp(e.target.value)} 
                                    className={`w-full ${error && !nipp ? 'p-invalid' : ''}`} 
                                    placeholder={error && !nipp ? 'NIPP harus diisi' : 'Masukkan NIPP'}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <Button
                            label={loading ? 'Loading...' : 'Submit'} 
                            className={`w-full mt-2 ${loading ? 'p-button-secondary' : ''}`} 
                            onClick={fetchData}
                            disabled={loading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputBankSoalUI;