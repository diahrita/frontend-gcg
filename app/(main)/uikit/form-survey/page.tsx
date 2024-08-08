'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';

interface DropdownItem {
    name: string;
    code: string;
}

const Klaim = () => {
    const [dropdownItem, setDropdownItem] = useState<DropdownItem | null>(null);
    const dropdownItems: DropdownItem[] = useMemo(
        () => [
            { name: 'Pemeriksaan Area Kerja', code: '5' },
            { name: 'Cabin Check', code: '6' },
            { name: 'Pemeriksaan Fungsi dan Kondisi RTG', code: '7' }
        ],
        []
    );
    const toast = useRef<Toast | null>(null);

    useEffect(() => {
        setDropdownItem(dropdownItems[0]);
    }, [dropdownItems]);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h4>Form Survey</h4>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="lastname2">Nama Lengkap</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <InputText type="text" />
                            </div>                       
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="lastname2">NIPP</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-id-card"></i>
                                </span>
                                <InputText type="text" keyfilter="int" />
                            </div>                       
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="lastname2">Departemen</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-book"></i>
                                </span>
                                <InputText type="text" />
                            </div>                       
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="lastname2">Jabatan</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-sitemap"></i>
                                </span>
                                <InputText type="text" />
                            </div>                       
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="state">Pilih Aspek</label>
                            <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="firstname2">Kode Soal</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-key"></i>
                                </span>
                                <InputText type="text" />
                            </div>
                        </div>
                        {/* <div className="field col-12">
                            <label htmlFor="firstname2">Upload Foto</label>
                            <FileUpload name="demo[]" url="/api/upload" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000} />
                        </div>
                        <div className="field col-12">
                            <label htmlFor="address">Deskripsi Kerusakan</label>
                            <InputTextarea id="address" rows={4} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="pnum" className="block mb-2">Jumlah Kerusakan Barang</label>
                            <InputText id="pnum" keyfilter="pnum" className="w-full" />
                        </div> */}
                        <div className="field col-12">
                            <Button label="Submit"></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Klaim;
