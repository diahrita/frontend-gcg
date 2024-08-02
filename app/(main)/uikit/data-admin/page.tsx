/* eslint-disable @next/next/no-img-element */
'use client';
import { fetchBusinessPartnerData } from '@/app/api/partner/partnerData';
import { DataPartner } from '@/types/partner';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useState } from 'react';

const DataAdmin = () => {
    const [data, setData] = useState<DataPartner[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const savedData = sessionStorage.getItem('businessPartnerData');
        if (savedData) {
            setData(JSON.parse(savedData));
            setLoading(false);
        } else {
            fetchBusinessPartnerData().then(result => {
                if (result) {
                    setData(result);
                    sessionStorage.setItem('businessPartnerData', JSON.stringify(result));
                } else {
                    setError('Failed to fetch data from API');
                }
                setLoading(false);
            }).catch(() => {
                setError('Failed to fetch data from API');
                setLoading(false);
            });
        }
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const filteredData = data?.filter(partner => 
        partner.short_name !== "-" ||
        partner.email !== "-" ||
        partner.phone !== "-" ||
        partner.add_street1 !== "-" ||
        partner.postal_code !== "-" ||
        partner.tax_no !== "-"
    ) || [];

    
    const dataWithDisplayId = filteredData.map((partner, index) => ({
        ...partner,
        id : index + 1 
    }));

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" severity="success" className="mr-2" />
                <Button label="Export" icon="pi pi-upload" severity="help" />
            </React.Fragment>
        );
    };

    const idBodyTemplate = (partner: DataPartner) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {partner.id}
            </>
        );
    };

    const nameBodyTemplate = (partner: DataPartner) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {partner.contact_ref || 'No Name Ref'}
            </>
        );
    };

    const contactBodyTemplate = (partner: DataPartner) => {
        return (
            <>
                <span className="p-column-title">Contact</span>
                {partner.phone || 'No Contact Ref'}
            </>
        );
    };

    const emailBodyTemplate = (partner: DataPartner) => {
        return (
            <>
                <span className="p-column-title">Email</span>
                {partner.email || 'No Email'}
            </>
        );
    };

    const actionBodyTemplate = (partner: DataPartner) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="warning" className="mr-2" />
            </>
        );
    };

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
                    <DataTable
                        value={dataWithDisplayId}
                        dataKey="id"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} records"
                        emptyMessage="No data found."
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

