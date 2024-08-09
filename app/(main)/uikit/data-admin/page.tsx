'use client';
import { useDataAdminLogic } from '@/app/api/partner/logic/partnerLogic';
import { useRegisterAdminForm } from '@/app/api/register/logic/RegisterAdminLogic';
import { Demo } from '@/types';
import { DataPartner } from '@/types/partner';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { ProgressBar } from 'primereact/progressbar';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { ProductService } from '../../../../demo/service/ProductService';
import './style.css';

const DataAdmin = () => {
    // State for Data Admin
    const { dataWithDisplayId, loading, error, handlePageChange } = useDataAdminLogic();

    const { formData, error_regis, success, loading_regis, handleChange, handleSubmit } = useRegisterAdminForm();

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [product, setProduct] = useState<Demo.Product>({
        id: '',
        name: '',
        mail: '',
        telepon: '',
        password: ''
    });

    const [partner, setPartner] = useState<DataPartner>({
        id: 0,
        partner_path_name: '',
        contact_id: '',
        contact_ref: '',
        code_ref: '',
        short_name: '',
        sp_short_name: '',
        description: '',
        title: '',
        job_position: '',
        email: '',
        phone: '',
        mobile: '',
        add_street1: '',
        postal_code: '',
        tax_no: ''
    });

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

    const editProduct = (partner: DataPartner) => {
        setPartner({ ...partner });
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

    const actionBodyTemplate = (rowData: DataPartner) => (
        <>
            <Button icon="pi pi-pencil" rounded severity="warning" className="mr-2 small-button" onClick={() => editProduct(rowData)} />
        </>
    );

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Data Admin</h5>
            <div className="flex justify-between items-center mt-2 md:mt-0">
                <span className="block mt-2 md:mt-0 p-input-icon-left mr-4">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
                </span>
                <Button label="New" icon="pi pi-plus" severity="success" className="mr-4" onClick={openNew} />
                <Button label="Export" icon="pi pi-upload" severity="help" className="mr-4" onClick={exportCSV} />
            </div>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </>
    );

    const newProductDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label={loading_regis ? 'Saving...' : 'Save'} icon={loading_regis ? '' : 'pi pi-check'} className="p-button-text" onClick={saveProduct} disabled={loading_regis} />
            {loading_regis && <i className="pi pi-spinner pi-spin" style={{ marginLeft: '0.5em' }}></i>}
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
                    <DataTable
                        value={dataWithDisplayId}
                        dataKey="id"
                        paginator
                        rows={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} records"
                        emptyMessage="No data available"
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column field="id" header="Id" sortable body={idBodyTemplate} headerStyle={{ minWidth: '3rem' }} className="height-colum"></Column>
                        <Column field="contact_ref" header="Name" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '10rem' }} className="height-colum"></Column>
                        <Column field="phone" header="Contact" sortable body={contactBodyTemplate} headerStyle={{ minWidth: '10rem' }} className="height-colum"></Column>
                        <Column field="email" header="Email" sortable body={emailBodyTemplate} headerStyle={{ minWidth: '10rem' }} className="height-colum"></Column>
                        <Column header="Action" body={actionBodyTemplate} headerStyle={{ minWidth: '5rem' }} className="height-colum"></Column>
                    </DataTable>
                </div>
            </div>

            {/* Edit Data */}
            <Dialog visible={productDialog} style={{ width: '450px' }} header="Data Admin" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="contact_ref">Name</label>
                    <InputText id="contact_ref" placeholder="Name" value={partner.contact_ref} onChange={(e) => onInputChange(e, 'contact_ref')} required autoFocus className={classNames({ 'p-invalid': submitted && !partner.contact_ref })} />
                    {submitted && !partner.contact_ref && <small className="p-invalid">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <InputText id="email" placeholder="Email" onChange={(e) => onInputChange(e, 'email')} required className={classNames({ 'p-invalid': submitted && !partner.email })} />
                    {submitted && !partner.email && <small className="p-invalid">Email is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="phone">Contact</label>
                    <InputText id="phone" placeholder="Nomor Telepon" onChange={(e) => onInputChange(e, 'phone')} required className={classNames({ 'p-invalid': submitted && !partner.phone })} />
                    {submitted && !partner.phone && <small className="p-invalid">Contact is required.</small>}
                </div>
            </Dialog>

            {/* New Data */}
            <Dialog visible={newProductDialog} style={{ width: '450px' }} header="Tambah Data Admin" modal className="p-fluid" footer={newProductDialogFooter} onHide={hideDialog}>
                <form id="adminForm" onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="username">Username</label>
                        <InputText
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder={submitted && !formData.username ? 'Username is required' : 'Username'}
                            className={classNames('input-field', { 'input-invalid': submitted && !formData.username })}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="short_name">Short Name</label>
                        <InputText
                            type="text"
                            id="short_name"
                            name="short_name"
                            value={formData.short_name}
                            onChange={handleChange}
                            required
                            placeholder={submitted && !formData.short_name ? 'Short Name is required' : 'Short Name'}
                            className={classNames('input-field', { 'input-invalid': submitted && !formData.short_name })}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <InputText
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder={submitted && !formData.email ? 'Email is required' : 'Email'}
                            className={classNames('input-field', { 'input-invalid': submitted && !formData.email })}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="phone">Telepon</label>
                        <InputText
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder={submitted && !formData.phone ? 'Telepon is required' : 'Telepon'}
                            className={classNames('input-field', { 'input-invalid': submitted && !formData.phone })}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <Password
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            toggleMask
                            placeholder={submitted && !formData.password ? 'Password is required' : 'Password'}
                            className={classNames('input-field', { 'input-invalid': submitted && !formData.password })}
                        />
                    </div>

                    <button type="submit" disabled={loading_regis}>
                        {loading_regis ? 'Submitting...' : 'Register'}
                    </button>
                </form>
                {error_regis && <p className="error-message">{error_regis}</p>}
                {success && <p className="success-message">{success}</p>}
            </Dialog>
        </div>
    );
};

export default DataAdmin;
