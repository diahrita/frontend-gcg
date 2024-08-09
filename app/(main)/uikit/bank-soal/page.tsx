'use client'

import useBankSoalLogic from '@/app/api/assesment/logic/BankSoalLogic';
import { Messages } from '@/app/hendlererror/message/messages';
import Link from 'next/link';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { MenuItem } from 'primereact/menuitem';
import { classNames } from 'primereact/utils';
import { BreadCrumb } from 'primereact/breadcrumb';

const BankSoalUI = () => {
    const {
        data,
        loading,
        error,
        isEditMode,
        banksoals,
        banksoalDialog,
        deleteBankSoalDialog,
        banksoal,
        submitted,
        globalFilter,
        toast,
        dt,
        handleLinkClick,
        openNew,
        hideDialog,
        saveBankSoal,
        setGlobalFilter,
        onInputChange,
    } = useBankSoalLogic();

    const DialogFooter = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={hideDialog} className="p-button-text" />
            <Button label="Save" icon="pi pi-check" onClick={saveBankSoal} autoFocus />
        </div>
    );

    const items: MenuItem[] = [{ label: 'Input Kode Alat dan NIPP', url: '/uikit/input-bank-soal'  }, { label: 'Bank Soal'}];
    const home: MenuItem = { icon: 'pi pi-home', url: '/' }
    
    return (
        <>
            <div className="card">
            <BreadCrumb model={items} home={home} />
                <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center mb-4">
                    <h5 className="m-0">Kategori</h5>
                    <div className="flex justify-between items-center mt-2 md:mt-0">
                        <span className="block mt-2 md:mt-0 p-input-icon-left mr-4">
                            <i className="pi pi-search" />
                            <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
                        </span>
                        <Button label="New" icon="pi pi-plus" severity="success" className="mr-2" onClick={openNew} />
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
                                            <Badge value={data.length} size="xlarge" severity="warning"></Badge>
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

export default BankSoalUI;