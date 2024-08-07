/* eslint-disable @next/next/no-img-element */
'use client';
import { getDetailByHeaderId } from '@/app/api/assesment/detailAssessments';
import { Messages } from '@/app/hendlererror/message/messages';
import { Demo } from '@/types';
import { AssessmentItem } from '@/types/assessment';
import moment from 'moment';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { ProgressBar } from 'primereact/progressbar';
import { Toast } from 'primereact/toast';
import { Nullable } from "primereact/ts-helpers";
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';

const Crud = () => {
    const [data, setData] = useState<AssessmentItem[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const title = sessionStorage.getItem('title');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const code_alat = sessionStorage.getItem('codeAlat');
                const nipp = sessionStorage.getItem('nipp');
                const headerIdStr = sessionStorage.getItem('header_id');

                if (!code_alat || !nipp || !headerIdStr) {
                    setLoading(false);
                    return;
                }

                const headerId = Number(headerIdStr);

                if (isNaN(headerId)) {
                    setError('Invalid header ID');
                    setLoading(false);
                    return;
                }

                const result = await getDetailByHeaderId(headerId, code_alat, nipp);
                if (result.successCode === 200 && result.data) {
                    setData(result.data.data);
                    console.log('Data SET:', result.data.data); 
                } else {
                    const storedError = sessionStorage.getItem(Messages.ERROR);
                    setError(storedError || Messages.GENERIC_ERROR);
                }
            } catch (err) {
                console.error('Fetch data error:', err);
                const storedError = sessionStorage.getItem(Messages.ERROR);
                setError(storedError || Messages.GENERIC_ERROR);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data) {
            // console.log('Data updated:', data);
        }
    }, [data]);

    const filteredData = (data && Array.isArray(data) ? data : []).filter(item =>
        item.pertanyaan !== "-" ||
        item.jawaban !== "-" ||
        item.grup !== "-" ||
        item.group_position !== "-"
    );

    const dataWithDisplayId =filteredData.map((item, index) => ({
        ...item,
        id: index + 1
    }));

      

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


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _soal = { ...soal };
        _soal[`${name}`] = val;

        setSoal(_soal);
    };

    const idBodyTemplate = (item:AssessmentItem ) => (
        <>
            <span className="p-column-title">Id</span>
            {item.id}
        </>
    );


    const pertanyaanBodyTemplate = (item : AssessmentItem) => {
        return (
            <>
                <span className="p-column-title">Pertanyaan</span>
                {item.pertanyaan}
            </>
        );
    };

    const jumlahBodyTemplate = (item: AssessmentItem) => {
        return (
            <>
                <span className="p-column-title">Jumlah</span>
                {item.jumlah}
            </>
        );
    };

    const jawabanBodyTemplate = (item: AssessmentItem) => {
        return (
            <>
                <span className="p-column-title">Jawaban</span>
                {item.jawaban}
            </>
        );
    };

    const grupBodyTemplate = (item: AssessmentItem) => {
        return (
            <>
                <span className="p-column-title">Grup</span>
                {item.grup}
            </>
        );
    };

    const createdAtBodyTemplate = (item : AssessmentItem) => {
        const formattedDate = moment(item.created_at).format("DD MMMM YYYY, HH:mm");
    
        return (
            <>
                <span className="p-column-title">Tanggal Dibuat</span>
                {formattedDate}
            </>
        );
    };

    const modifiedAtBodyTemplate = (item: AssessmentItem) => {
        return (
            <>
                <span className="p-column-title">Tanggal Diubah</span>
                {item.modified_at}
            </>
        );
    };

    const showBodyTemplate = (item: AssessmentItem) => {
        return (
            <>
                <span className="p-column-title">Tampilkan</span>
                {item.show}
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
            <h5 className="m-0">{title}</h5>
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

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                {loading && (
                        <div style={{ padding: '10px', display: 'inline-block', width: '100%', position: 'relative' }}>
                            <span style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#333' }}>Loading...</span>
                            <ProgressBar mode="indeterminate" style={{ marginTop: '10px', height: '8px', width: '100%' }} />
                        </div>
                    )}
                    {error && <div style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', borderRadius: '4px', marginBottom: '1rem' }}>{error}</div>}
                <DataTable
                value={dataWithDisplayId}
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
                <Column field="id" header="Id" body={idBodyTemplate} sortable headerStyle={{ minWidth: '5rem' }}></Column>
                <Column field="pertanyaan" header="Pertanyaan"  body={pertanyaanBodyTemplate} sortable headerStyle={{ minWidth: '25rem' }}></Column>
               
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