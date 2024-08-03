'use client';
import { fetchBusinessPartnerData } from '@/app/api/partner/partnerData';
import { DataPartner } from '@/types/partner';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toolbar } from 'primereact/toolbar';
import { useEffect, useState } from 'react';

const DataAdmin = () => {
    const [data, setData] = useState<DataPartner[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const storedError = sessionStorage.getItem('error');
            if (storedError) {
                setError(storedError);
                setLoading(false);
                return;
            }

            const savedData = sessionStorage.getItem('businessPartnerData');
            if (savedData) {
                setData(JSON.parse(savedData));
                setLoading(false);
            } else {
                try {
                    const result = await fetchBusinessPartnerData();
                    if (result.data) {
                        setData(result.data);
                        sessionStorage.setItem('businessPartnerData', JSON.stringify(result.data));
                        sessionStorage.removeItem('error');
                    } else {
                        setError('Maaf, server sedang dalam pemeliharaan.');
                    }
                } catch {
                    setError('Terjadi kesalahan saat mengambil data.');
                }
                setLoading(false);
            }
        };

        fetchData();

        // Set an interval to periodically check for errors
        const errorCheckInterval = setInterval(() => {
            const storedError = sessionStorage.getItem('error');
            if (storedError && storedError !== error) {
                setError(storedError);
            }
        }, 5000); 
    
        sessionStorage.removeItem('error');
        return () => clearInterval(errorCheckInterval); 
    }, [error]);


    if (loading) return <p>Loading...</p>;

    const filteredData = (data && Array.isArray(data) ? data : []).filter(partner => 
        partner.short_name !== "-" ||
        partner.email !== "-" ||
        partner.phone !== "-" ||
        partner.add_street1 !== "-" ||
        partner.postal_code !== "-" ||
        partner.tax_no !== "-"
    );

    const dataWithDisplayId = filteredData.map((partner, index) => ({
        ...partner,
        id: index + 1 
    }));

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
                    {error && (
                        <div className="error-message" style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', borderRadius: '4px', marginBottom: '1rem' }}>
                            {error}
                        </div>
                    )}
                    <DataTable
                        value={dataWithDisplayId}
                        dataKey="id"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} records"
                        emptyMessage="No data available"
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column field="displayId" header="Id" sortable body={idBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="contact_ref" header="Name" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="contact_ref" header="Contact" sortable body={contactBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="email" header="Email" sortable body={emailBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column header="Action" body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default DataAdmin;