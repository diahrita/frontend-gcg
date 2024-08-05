'use client';
import { useDataAdminLogic } from '@/app/api/partner/logic/partnerLogic';
import { Demo } from '@/types';
import { DataPartner } from '@/types/partner';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { ProgressBar } from 'primereact/progressbar';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { ProductService } from '../../../../demo/service/ProductService';

const DataAdmin = () => {
    // State for Data Admin
    const { dataWithDisplayId, loading, error, handlePageChange } = useDataAdminLogic();

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [product, setProduct] = useState<Demo.Product>({
        id: '',
        name: '',
        mail: '',
        telepon: '',
        password: ''
    });
    const [selectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [newProductDialog, setNewProductDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data as any));
    }, []);

    const openNew = () => {
        setProduct({
            id: '',
            name: '',
            mail: '',
            telepon: '',
            password: ''
        });
        setSubmitted(false);
        setNewProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
        setNewProductDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...(products as any)];
            let _product = { ...product };
            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000
                });
            } else {
                _product.id = createId();
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000
                });
            }

            setProducts(_products as any);
            setProductDialog(false);
            setProduct({
                id: '',
                name: '',
                mail: '',
                telepon: '',
                password: ''
            });
        }
    };

    const addAdmin = (product: Demo.Product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < (products as any)?.length; i++) {
            if ((products as any)[i].id === id) {
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

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e: InputNumberValueChangeEvent, name: string) => {
        const val = e.value || 0;
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const rightToolbarTemplate = () => (
        <>
            <Button label="New" icon="pi pi-plus" severity="success" className="mr-2" onClick={openNew} />
            <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
        </>
    );

    const leftToolbarTemplate = () => (
        <React.Fragment>
            <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="mr-2 inline-block" />
        </React.Fragment>
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
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveProduct} />
        </>
    );

    const newProductDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
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

                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

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

            {/* Edit Data */}
            <Dialog visible={productDialog} style={{ width: '450px' }} header="Data Admin" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-invalid">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="mail">Mail</label>
                    <InputText id="mail" value={product.mail} onChange={(e) => onInputChange(e, 'mail')} required className={classNames({ 'p-invalid': submitted && !product.mail })} />
                    {submitted && !product.mail && <small className="p-invalid">Mail is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="telepon">Telepon</label>
                    <InputText id="telepon" value={product.telepon} onChange={(e) => onInputChange(e, 'telepon')} required className={classNames({ 'p-invalid': submitted && !product.telepon })} />
                    {submitted && !product.telepon && <small className="p-invalid">Telepon is required.</small>}
                </div>
            </Dialog>

            {/* New Data */}
            <Dialog visible={newProductDialog} style={{ width: '450px' }} header="Tambah Data Admin" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-invalid">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="mail">Mail</label>
                    <InputText id="mail" value={product.mail} onChange={(e) => onInputChange(e, 'mail')} required className={classNames({ 'p-invalid': submitted && !product.mail })} />
                    {submitted && !product.mail && <small className="p-invalid">Mail is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="telepon">Telepon</label>
                    <InputText id="telepon" value={product.telepon} onChange={(e) => onInputChange(e, 'telepon')} required className={classNames({ 'p-invalid': submitted && !product.telepon })} />
                   
                    {submitted && !product.telepon && <small className="p-invalid">Telepon is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <InputText id="password" type="password" value={product.password} onChange={(e) => onInputChange(e, 'password')} required className={classNames({ 'p-invalid': submitted && !product.password })} />
                    {submitted && !product.password && <small className="p-invalid">Password is required.</small>}
                </div>
            </Dialog>
            
        </div>
    );
};

export default DataAdmin;
