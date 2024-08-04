'use client'
import { useDataAdminLogic } from '@/app/api/partner/logic/partnerLogic';
import { DataPartner } from '@/types/partner';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ProgressBar } from 'primereact/progressbar';
import { Toolbar } from 'primereact/toolbar';



const DataAdmin = () => {
    const { dataWithDisplayId, loading, error, handlePageChange } = useDataAdminLogic();
   

    const rightToolbarTemplate = () => (
        <>
            <Button label="New" icon="pi pi-plus" severity="success" className="mr-2" />
            <Button label="Export" icon="pi pi-upload" severity="help" />
        </>
    );

    const idBodyTemplate = (partner: DataPartner) => (
        <>
            <span className="p-column-title">Id</span>
            {partner.id}
        </>
    );

    const nameBodyTemplate = (partner: DataPartner) => (
        <>
            <span className="p-column-title">Name</span>
            {partner.contact_ref || 'No Name Ref'}
        </>
    );

    const contactBodyTemplate = (partner: DataPartner) => (
        <>
            <span className="p-column-title">Contact</span>
            {partner.phone || 'No Contact Ref'}
        </>
    );

    const emailBodyTemplate = (partner: DataPartner) => (
        <>
            <span className="p-column-title">Email</span>
            {partner.email || 'No Email'}
        </>
    );

    const actionBodyTemplate = (partner: DataPartner) => (
        <>
            <Button icon="pi pi-pencil" rounded severity="warning" className="mr-2" />
        </>
    );

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Data Admin</h5>
            <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
        </div>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                { loading && (
                            <div style={{ padding : '10px' ,display: 'inline-block', width: '100%', position: 'relative' }}>
                                <span style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#333' }}>
                                    Loading...
                                </span>
                                <ProgressBar mode="indeterminate" style={{ marginTop: '10px', height: '8px', width: '100%' }} />
                            </div>
                    )}
                    {error && (
                        <div style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', borderRadius: '4px', marginBottom: '1rem' }}>
                            {error}
                        </div>
                    )}
                    <DataTable
                        value={dataWithDisplayId}
                        dataKey="id"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        onPage={handlePageChange}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} records"
                        emptyMessage="No data available"
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column field="id" header="Id" sortable body={idBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="contact_ref" header="Name" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="phone" header="Contact" sortable body={contactBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="email" header="Email" sortable body={emailBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column header="Action" body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default DataAdmin;