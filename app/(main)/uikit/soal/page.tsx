/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import React, { useRef, useState } from 'react';
import { Demo } from '@/types';
import { Calendar } from 'primereact/calendar';
import { Nullable } from "primereact/ts-helpers";
import { BreadCrumb } from 'primereact/breadcrumb';
import { MenuItem } from 'primereact/menuitem';

const Crud = () => {
    let emptySoal: Demo.Soal = {
        id: 0,
        pertanyaan: '',
        jumlah: 0,
        jawaban: 0,
        grup: '',
        created_at: '',
        modified_at: '',
        show: 0
    };

    const [editSoalDialog, setEditSoalDialog] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [soals, setSoals] = useState<Demo.Soal[] | null>(null);
    const [soalDialog, setSoalDialog] = useState(false);
    const [deleteSoalDialog, setDeleteSoalDialog] = useState(false);
    const [soal, setSoal] = useState<Demo.Soal>(emptySoal);
    const [selectedSoals] = useState<Demo.Soal[] | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    // useEffect(() => {
    //     SoalService.getSoals().then((data) => setSoals(data as any));
    // }, []);

    const openNew = () => {
        setSoal(emptySoal);
        setSubmitted(false);
        setSoalDialog(true);
        setIsEditMode(false);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setSoalDialog(false);
    };

    const hideDeleteSoalDialog = () => {
        setDeleteSoalDialog(false);
    };

    const saveSoal = () => {
      setSubmitted(true);
  
      if (soal.pertanyaan && soal.jawaban) {
      } else {
          toast.current?.show({
              severity: 'error',
              summary: 'Error',
              detail: 'Pertanyaan dan Jawaban harus diisi',
              life: 3000
          });
      }
  };
  

    const editSoal = (soal: Demo.Soal) => {
        setSoal({ ...soal });
        setSoalDialog(true);
        setIsEditMode(true);
    };

    const confirmDeleteSoal = (soal: Demo.Soal) => {
        setSoal(soal);
        setDeleteSoalDialog(true);
    };

    const deleteSoal = () => {
        let _soals = (soals as any)?.filter((val: any) => val.id !== soal.id);
        setSoals(_soals);
        setDeleteSoalDialog(false);
        setSoal(emptySoal);
        toast.current?.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Soal Deleted',
            life: 3000
        });
    };

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < (soals as any)?.length; i++) {
            if ((soals as any)[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _soal = { ...soal };
        _soal[`${name}`] = val;

        setSoal(_soal);
    };

    const pertanyaanBodyTemplate = (rowData: Demo.Soal) => {
        return (
            <>
                <span className="p-column-title">Pertanyaan</span>
                {rowData.pertanyaan}
            </>
        );
    };

    const jumlahBodyTemplate = (rowData: Demo.Soal) => {
        return (
            <>
                <span className="p-column-title">Jumlah</span>
                {rowData.jumlah}
            </>
        );
    };

    const jawabanBodyTemplate = (rowData: Demo.Soal) => {
        return (
            <>
                <span className="p-column-title">Jawaban</span>
                {rowData.jawaban}
            </>
        );
    };

    const grupBodyTemplate = (rowData: Demo.Soal) => {
        return (
            <>
                <span className="p-column-title">Grup</span>
                {rowData.grup}
            </>
        );
    };

    const createdAtBodyTemplate = (rowData: Demo.Soal) => {
        return (
            <>
                <span className="p-column-title">Tanggal Dibuat</span>
                {rowData.created_at}
            </>
        );
    };

    const modifiedAtBodyTemplate = (rowData: Demo.Soal) => {
        return (
            <>
                <span className="p-column-title">Tanggal Diubah</span>
                {rowData.modified_at}
            </>
        );
    };

    const showBodyTemplate = (rowData: Demo.Soal) => {
        return (
            <>
                <span className="p-column-title">Tampilkan</span>
                {rowData.show}
            </>
        );
    };

    const actionBodyTemplate = (rowData: Demo.Soal) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editSoal(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteSoal(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Pemeriksaan Area Kerja</h5>
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

                    <Dialog
                        visible={soalDialog}
                        style={{ width: '450px' }}
                        header={getDialogHeader()}
                        modal
                        className="p-fluid"
                        footer={newSoalDialogFooter}
                        onHide={() => setSoalDialog(false)}
                    >
                        <div className="field">
                              <label htmlFor="pertanyaan">Pertanyaan</label>
                              <InputText
                                  id="pertanyaan"
                                  value={soal.pertanyaan || ''}
                                  onChange={(e) => onInputChange(e, 'pertanyaan')}
                                  required
                                  autoFocus
                                  className={classNames({ 'p-invalid': submitted && !soal.pertanyaan })}
                              />
                              {submitted && !soal.pertanyaan && <small className="p-error">Pertanyaan is required.</small>}
                          </div>
                          <div className="field">
                              <label htmlFor="jawaban">Jawaban</label>
                              <InputText
                                  id="jawaban"
                                  value={soal.jawaban !== undefined ? soal.jawaban.toString() : ''}
                                  onChange={(e) => onInputChange(e, 'jawaban')}
                                  required
                                  className={classNames({ 'p-invalid': submitted && soal.jawaban === undefined })}
                              />
                              {submitted && soal.jawaban === undefined && <small className="p-error">Jawaban is required.</small>}
                          </div>
                          <div className="field">
                              <label htmlFor="jumlah">Jumlah</label>
                              <InputText
                                  id="jumlah"
                                  value={soal.jumlah !== undefined ? soal.jumlah.toString() : ''}
                                  onChange={(e) => onInputChange(e, 'jumlah')}
                                  required
                                  className={classNames({ 'p-invalid': submitted && soal.jumlah === undefined })}
                              />
                              {submitted && soal.jumlah === undefined && <small className="p-error">Jumlah is required.</small>}
                          </div>
                          <div className="field">
                              <label htmlFor="grup">Grup</label>
                              <InputText
                                  id="grup"
                                  value={soal.grup}
                                  onChange={(e) => onInputChange(e, 'grup')}
                                  required
                                  className={classNames({ 'p-invalid': submitted && !soal.grup })}
                              />
                              {submitted && !soal.grup && <small className="p-error">Grup is required.</small>}
                         </div>
                         <div className="field">
                              <label htmlFor="created_at">Tanggal Dibuat</label>
                              <Calendar
                                  id="created_at"
                                  value={datetime24h}
                                  onChange={(e) => setDateTime24h(e.value)}
                                  dateFormat="dd/mm/yy"
                                  showTime
                                  hourFormat="24"
                              />
                         </div>
                         <div className="field">
                              <label htmlFor="modified_at">Tanggal Diubah</label>
                              <Calendar
                                  id="modified_at"
                                  value={datetime24h}
                                  onChange={(e) => setDateTime24h(e.value)}
                                  dateFormat="dd/mm/yy"
                                  showTime
                                  hourFormat="24"
                              />
                         </div>
                         <div className="field">
                               <label htmlFor="show">Tampilkan</label>
                               <InputText
                                  id="show"
                                  value={soal.show !== undefined ? soal.show.toString() : ''}
                                  onChange={(e) => onInputChange(e, 'show')}
                                  required
                                  className={classNames({ 'p-invalid': submitted && !soal.show })}
                              />
                               {submitted && !soal.show && <small className="p-error">Tampilkan is required.</small>}
                         </div>
                    </Dialog>

                    <Dialog
                         visible={editSoalDialog}
                         style={{ width: '450px' }}
                         header={getDialogHeader()}
                         modal
                         className="p-fluid"
                         footer={editSoalDialogFooter}
                         onHide={() => setEditSoalDialog(false)}
                    >
                        <div className="field">
                              <label htmlFor="pertanyaan">Pertanyaan</label>
                              <InputText
                                  id="pertanyaan"
                                  value={soal.pertanyaan || ''}
                                  onChange={(e) => onInputChange(e, 'pertanyaan')}
                                  required
                                  autoFocus
                                  className={classNames({ 'p-invalid': submitted && !soal.pertanyaan })}
                              />
                              {submitted && !soal.pertanyaan && <small className="p-error">Pertanyaan is required.</small>}
                          </div>
                          <div className="field">
                              <label htmlFor="jawaban">Jawaban</label>
                              <InputText
                                  id="jawaban"
                                  value={soal.jawaban !== undefined ? soal.jawaban.toString() : ''}
                                  onChange={(e) => onInputChange(e, 'jawaban')}
                                  required
                                  className={classNames({ 'p-invalid': submitted && soal.jawaban === undefined })}
                              />
                              {submitted && soal.jawaban === undefined && <small className="p-error">Jawaban is required.</small>}
                          </div>
                          <div className="field">
                              <label htmlFor="jumlah">Jumlah</label>
                              <InputText
                                  id="jumlah"
                                  value={soal.jumlah !== undefined ? soal.jumlah.toString() : ''}
                                  onChange={(e) => onInputChange(e, 'jumlah')}
                                  required
                                  className={classNames({ 'p-invalid': submitted && soal.jumlah === undefined })}
                              />
                              {submitted && soal.jumlah === undefined && <small className="p-error">Jumlah is required.</small>}
                          </div>
                          <div className="field">
                              <label htmlFor="grup">Grup</label>
                              <InputText
                                  id="grup"
                                  value={soal.grup}
                                  onChange={(e) => onInputChange(e, 'grup')}
                                  required
                                  className={classNames({ 'p-invalid': submitted && !soal.grup })}
                              />
                              {submitted && !soal.grup && <small className="p-error">Grup is required.</small>}
                         </div>
                         <div className="field">
                              <label htmlFor="modified_at">Tanggal Diubah</label>
                              <Calendar
                                  id="modified_at"
                                  value={datetime24h}
                                  onChange={(e) => setDateTime24h(e.value)}
                                  dateFormat="dd/mm/yy"
                                  showTime
                                  hourFormat="24"
                              />
                         </div>
                         <div className="field">
                               <label htmlFor="show">Tampilkan</label>
                               <InputText
                                  id="show"
                                  value={soal.show !== undefined ? soal.show.toString() : ''}
                                  onChange={(e) => onInputChange(e, 'show')}
                                  required
                                  className={classNames({ 'p-invalid': submitted && !soal.show })}
                              />
                               {submitted && !soal.show && <small className="p-error">Tampilkan is required.</small>}
                         </div>
                    </Dialog>
                    
                    <Dialog
                        visible={deleteSoalDialog}
                        style={{ width: '450px' }}
                        header="Confirm"
                        modal
                        footer={deleteSoalDialogFooter}
                        onHide={hideDeleteSoalDialog}
                    >
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {soal && (
                                <span>
                                    Are you sure you want to delete <b>{soal.id}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Crud;
