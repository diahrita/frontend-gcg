/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import React, { useRef, useState } from 'react';
import { Demo } from '@/types';

/* @todo Used 'as any' for types here. Will fix in next version due to onSelectionChange event type issue. */
const AspekPenilaian = () => {
    let emptyAspek: Demo.Aspek = {
        id: '',
        aspekpenilaian: '',
        deskripsi: '',
        bobot: ''
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [newProductDialog, setNewProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [aspek, setAspek] = useState<Demo.Aspek>(emptyAspek);
    const [selectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    const openNew = () => {
        setAspek(emptyAspek);
        setSubmitted(false);
        setProductDialog(true);
        setNewProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
        setNewProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (aspek.aspekpenilaian.trim()) {
            let _products = [...(products as any)];
            let _product = { ...aspek };
            if (aspek.id) {
                const index = findIndexById(aspek.id);

                _products[index] = _product;
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000
                });
            } else {
                _product.id = createId();
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
            setAspek(emptyAspek);
        }
    };

    const editProduct = (aspek: Demo.Aspek) => {
        setAspek({ ...aspek });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (aspek: Demo.Aspek) => {
        setAspek(aspek);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _products = (products as any)?.filter((val: any) => val.id !== aspek.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setAspek(emptyAspek);
        toast.current?.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Deleted',
            life: 3000
        });
    };

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < (aspek as any)?.length; i++) {
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

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _aspek = { ...aspek };
        _aspek[`${name}`] = val;

        setAspek(_aspek);
    };

    const idBodyTemplate = (rowData: Demo.Aspek) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.id}
            </>
        );
    };

    const aspekpenilaianBodyTemplate = (rowData: Demo.Aspek) => {
        return (
            <>
                <span className="p-column-title">Aspek</span>
                {rowData.aspekpenilaian}
            </>
        );
    };

    const deskripsiBodyTemplate = (rowData: Demo.Aspek) => {
        return (
            <>
                <span className="p-column-title">Deskripsi</span>
                {rowData.deskripsi}
            </>
        );
    };

    const bobotBodyTemplate = (rowData: Demo.Aspek) => {
        return (
            <>
                <span className="p-column-title">Bobot</span>
                {rowData.bobot}
            </>
        );
    };

    const actionBodyTemplate = (rowData: Demo.Aspek) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteProduct(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Aspek Penilaian</h5>
            <div className="flex justify-between items-center mt-2 md:mt-0">
                <span className="block mt-2 md:mt-0 p-input-icon-left mr-4">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
                </span>
                <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
            </div>
        </div>
    );

    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteProduct} />
        </>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveProduct} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />

                    <DataTable
                        ref={dt}
                        value={products}
                        selection={selectedProducts}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[10, 25, 50]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                        emptyMessage="No products found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column field="id" header="No" sortable body={idBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="aspekpenilaian" header="Aspek Penilaian" sortable body={aspekpenilaianBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="deskripsi" header="Deskripsi" sortable body={deskripsiBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="bobot" header="Bobot" sortable body={bobotBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column header="Action" body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    {/* Edit nilai */}
                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Aspek Penilaian" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="Aspekpenilaian">Aspek Penilaian</label>
                            <InputText
                                id="aspekpenilaian"
                                value={aspek.aspekpenilaian}
                                onChange={(e) => onInputChange(e, 'aspekpenilaian')}
                                required
                                placeholder="Aspek Penilaian"
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !aspek.aspekpenilaian
                                })}
                            />
                            {submitted && !aspek.aspekpenilaian && <small className="p-invalid">Aspek Penilaian is required.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="Deskripsi">Deskripsi</label>
                            <InputTextarea
                                id="deskripsi"
                                value={aspek.deskripsi}
                                onChange={(e) => onInputChange(e, 'deskripsi')}
                                required
                                placeholder="Deskripsi Penilaian"
                                className={classNames({
                                    'p-invalid': submitted && !aspek.deskripsi
                                })}
                            />
                            {submitted && !aspek.deskripsi && <small className="p-invalid">Deskripsi is required.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="Bobot">Bobot</label>
                            <InputText
                                id="bobot"
                                value={aspek.bobot}
                                onChange={(e) => onInputChange(e, 'bobot')}
                                required
                                placeholder="Bobot Penilaian"
                                className={classNames({
                                    'p-invalid': submitted && !aspek.bobot
                                })}
                            />
                            {submitted && !aspek.bobot && <small className="p-invalid">Bobot is required.</small>}
                        </div>
                    </Dialog>

                    {/* New nilai */}
                    <Dialog visible={newProductDialog} style={{ width: '450px' }} header=" Tambah Aspek Penilaian" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="Aspekpenilaian">Aspek Penilaian</label>
                            <InputText
                                id="aspekpenilaian"
                                value={aspek.aspekpenilaian}
                                onChange={(e) => onInputChange(e, 'aspekpenilaian')}
                                required
                                placeholder="Aspek Penilaian"
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !aspek.aspekpenilaian
                                })}
                            />
                            {submitted && !aspek.aspekpenilaian && <small className="p-invalid">Aspek Penilaian is required.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="Deskripsi">Deskripsi</label>
                            <InputTextarea
                                id="deskripsi"
                                value={aspek.deskripsi}
                                onChange={(e) => onInputChange(e, 'deskripsi')}
                                required
                                placeholder="Deskripsi Penilaian"
                                className={classNames({
                                    'p-invalid': submitted && !aspek.deskripsi
                                })}
                            />
                            {submitted && !aspek.deskripsi && <small className="p-invalid">Deskripsi is required.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="Bobot">Bobot</label>
                            <InputText
                                id="bobot"
                                value={aspek.bobot}
                                onChange={(e) => onInputChange(e, 'bobot')}
                                required
                                placeholder="Bobot Penilaian"
                                className={classNames({
                                    'p-invalid': submitted && !aspek.bobot
                                })}
                            />
                            {submitted && !aspek.bobot && <small className="p-invalid">Bobot is required.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {aspek && (
                                <span>
                                    Are you sure you want to delete <b>{aspek.aspekpenilaian}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default AspekPenilaian;
