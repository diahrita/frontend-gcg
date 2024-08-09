'use client'
import { DetailAssessment } from '@/app/api/assesment/logic/DetailAssessment';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { ProgressBar } from 'primereact/progressbar';
import { classNames } from 'primereact/utils';
import React, { useRef, useState } from 'react';
import { Demo } from '@/types';
import { Calendar } from 'primereact/calendar';
import { Nullable } from "primereact/ts-helpers";
import { BreadCrumb } from 'primereact/breadcrumb';
import { MenuItem } from 'primereact/menuitem';

const Crud = () => {
    const {
        dataWithDisplayId,
        loading,
        error,
        title,
        editSoalDialog,
        isEditMode,
        soalDialog,
        deleteSoalDialog,
        soal,
        submitted,
        globalFilter,
        toast,
        openNew,
        hideDialog,
        hideDeleteSoalDialog,
        saveSoal,
        editSoal,
        confirmDeleteSoal,
        deleteSoal,
        onInputChange,
        setGlobalFilter
    } = DetailAssessment();

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <div className="flex flex-column">
                <h4 className="m-0 mb-2">Pemeriksaan Area Kerja</h4>
                <span className="m-0">Jumlah Soal : <span className="font-medium"><a>6</a></span></span>
                
            </div>
            <div className="flex justify-between items-center mt-2 md:mt-0">
                <span className="block mt-2 md:mt-0 p-input-icon-left mr-4">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
                </span>
                <Button label="New" icon="pi pi-plus" severity="success" className="mr-2" onClick={openNew} />
            </div>
        </div>
    );

    const deleteSoalDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteSoalDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteSoal} />
        </>
    );

    const soalDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveSoal} />
        </>
    );

    const [datetime24h, setDateTime24h] = useState<Nullable<Date>>(null);

    const getDialogHeader = () => {
        return isEditMode ? 'Edit Soal' : 'Tambah Soal';
    };

    const newSoalDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={() => setSoalDialog(false)} />
            <Button label="Save" icon="pi pi-check" text onClick={saveSoal} />
        </>
    );

    const editSoalDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={() => setEditSoalDialog(false)} />
            <Button label="Save" icon="pi pi-check" text onClick={saveSoal} />
        </>
    );

    const items: MenuItem[] = [{ label: 'Input Kode Alat dan NIPP', url: '/uikit/input-bank-soal'  }, { label: 'Bank Soal', url: '/uikit/bank-soal'}, { label: '1'}];
    const home: MenuItem = { icon: 'pi pi-home', url: '/' }

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                <BreadCrumb model={items} home={home} className='mb-3'/>
                    <Toast ref={toast} />

                    <DataTable
                        ref={dt}
                        value={soals}
                        selection={selectedSoals}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} soals"
                        globalFilter={globalFilter}
                        emptyMessage="No soals found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column field="id" header="Id" sortable headerStyle={{ minWidth: '5rem' }}></Column>
                        <Column field="pertanyaan" header="Pertanyaan" sortable headerStyle={{ minWidth: '25rem' }}></Column>
                        <Column field="jumlah" header="Jumlah" sortable body={jumlahBodyTemplate} headerStyle={{ minWidth: '5rem' }}></Column>
                        <Column field="jawaban" header="Jawaban" sortable body={jawabanBodyTemplate} headerStyle={{ minWidth: '5rem' }}></Column>
                        <Column field="grup" header="Grup" sortable body={grupBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="created_at" header="Tanggal Dibuat" sortable body={createdAtBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="modified_at" header="Tanggal Diubah" sortable body={modifiedAtBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="show" header="Tampilkan" sortable body={showBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column header="Actions" body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={soalDialog} style={{ width: '450px' }} header="Soal Details" modal className="p-fluid" footer={soalDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="pertanyaan">Pertanyaan</label>
                            <InputText id="pertanyaan" value={soal.pertanyaan} onChange={(e) => onInputChange(e, 'pertanyaan')} required autoFocus className={classNames({ 'p-invalid': submitted && !soal.pertanyaan })} />
                            {submitted && !soal.pertanyaan && <small className="p-invalid">Pertanyaan is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="jawaban">Jawaban</label>
                            <InputText id="jawaban" value={String(soal.jawaban)} onChange={(e) => onInputChange(e, 'jawaban')} required className={classNames({ 'p-invalid': submitted && !soal.jawaban })} />
                            {submitted && !soal.jawaban && <small className="p-invalid">Jawaban is required.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteSoalDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteSoalDialogFooter} onHide={hideDeleteSoalDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                            {`Are you sure you want to delete ${soal.pertanyaan}?`}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Crud;
