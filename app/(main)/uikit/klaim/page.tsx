'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { InputNumber } from 'primereact/inputnumber';

interface DropdownItem {
    name: string;
    code: string;
}

const Klaim = () => {
    const [dropdownItem, setDropdownItem] = useState<DropdownItem | null>(null);
    const dropdownItems: DropdownItem[] = useMemo(
        () => [
            { name: 'Pelindo Place', code: 'Pelindo Place' },
            { name: 'Administration Building', code: 'Administration Building' },
            { name: 'Customer Service Building', code: 'Customer Service Building' }
        ],
        []
    );
    const toast = useRef<Toast | null>(null);
    const onUpload = () => {
        toast.current?.show({
            severity: 'info',
            summary: 'Success',
            detail: 'File Uploaded',
            life: 3000
        });
    };
    const [inputNumberValue, setInputNumberValue] = useState<number | null>(null);

    useEffect(() => {
        setDropdownItem(dropdownItems[0]);
    }, [dropdownItems]);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h3>Form Klaim Kerusakan Barang</h3>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="firstname2">Kode Pelaporan</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <InputText placeholder="Kode Pelaporan" />
                            </div>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="lastname2">Nama Barang</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <InputText placeholder="Nama Barang" />
                            </div>
                        </div>
                        <div className="field col-12">
                            <label htmlFor="firstname2">Upload Foto</label>
                            <FileUpload name="demo[]" url="/api/upload" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000} />
                        </div>
                        <div className="field col-12">
                            <label htmlFor="address">Deskripsi Kerusakan</label>
                            <InputTextarea id="address" rows={4} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="city">Jumlah Kerusakan Barang</label>
                            <InputNumber id="quantity" value={inputNumberValue} onValueChange={(e) => setInputNumberValue} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="state">Lokasi</label>
                            <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>
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
