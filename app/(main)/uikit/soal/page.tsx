'use client'
import { DetailAssessment } from '@/app/api/assesment/logic/DetailAssessment';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { ProgressBar } from 'primereact/progressbar';
import { classNames } from 'primereact/utils';
import { format } from 'date-fns';

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

    const formatDate = (dateString: string | Date) => {
        if (!dateString) return '';
        return format(new Date(dateString), 'dd MMM yyyy HH:mm:ss');
    };

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    {loading && (
                        <div style={{ padding: '10px', display: 'inline-block', width: '100%', position: 'relative' }}>
                            <ProgressBar mode="indeterminate" style={{ height: '6px' }} />
                        </div>
                    )}
                    {error && <div className="alert alert-error">{error}</div>}
                    <DataTable value={dataWithDisplayId} header={header} globalFilter={globalFilter} paginator rows={10}>
                    <Column field="id" header="Id"  sortable headerStyle={{ minWidth: '5rem' }}></Column>
                    <Column field="pertanyaan" header="Pertanyaan"sortable headerStyle={{ minWidth: '25rem' }}></Column>
                    <Column field="jumlah" header="Jumlah" sortable headerStyle={{ minWidth: '5rem' }}></Column>
                    <Column field="jawaban" header="Jawaban" sortable headerStyle={{ minWidth: '5rem' }}></Column>
                    <Column field="grup" header="Grup" sortable headerStyle={{ minWidth: '10rem' }}></Column>
                    <Column body={(rowData: any) => formatDate(rowData.created_at)} header="Tanggal Dibuat" sortable headerStyle={{ minWidth: '10rem' }}></Column>
                    <Column body={(rowData: any) => formatDate(rowData.modified_at)} header="Tanggal Diubah" sortable headerStyle={{ minWidth: '10rem' }}></Column>
                    
                    <Column field="show" header="Tampilkan" sortable headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column header="Actions" headerStyle={{ minWidth: '10rem' }}
                            body={(rowData: any) => (
                                <div>
                                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-2" onClick={() => editSoal(rowData)} />
                                    <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteSoal(rowData)} />
                                </div>
                            )}
                        />

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
