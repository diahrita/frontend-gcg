/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import React, { useRef, useState } from 'react';
import { Demo } from '@/types';

/* @todo Used 'as any' for types here. Will fix in next version due to onSelectionChange event type issue. */
const KategoriPenilaian = () => {
    let emptyKategori: Demo.Kategori = {
        id: '',
        item: '',
        aspek: 0,
        indikator: 0,
        parameter: 0
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [newProductDialog, setNewProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [kategori, setKategori] = useState<Demo.Kategori>(emptyKategori);
    const [selectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    const openNew = () => {
        setKategori(emptyKategori);
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

        if (kategori.item.trim()) {
            let _products = [...(products as any)];
            let _product = { ...kategori };
            if (kategori.id) {
                const index = findIndexById(kategori.id);

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
            setKategori(emptyKategori);
        }
    };

    const editProduct = (kategori: Demo.Kategori) => {
        setKategori({ ...kategori });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (kategori: Demo.Kategori) => {
        setKategori(kategori);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _products = (products as any)?.filter((val: any) => val.id !== kategori.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setKategori(emptyKategori);
        toast.current?.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Deleted',
            life: 3000
        });
    };

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < (kategori as any)?.length; i++) {
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

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, item: string) => {
        const val = (e.target && e.target.value) || '';
        let _kategori = { ...kategori };
        _kategori[`${item}`] = val;

        setKategori(_kategori);
    };

    const onInputNumberChange = (e: InputNumberValueChangeEvent, item: string) => {
        const val = e.value || 0;
        let _kategori = { ...kategori };
        _kategori[`${item}`] = val;

        setKategori(_kategori);
    };

    const idBodyTemplate = (rowData: Demo.Aspek) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.id}
            </>
        );
    };

    const itemBodyTemplate = (rowData: Demo.Kategori) => {
        return (
            <>
                <span className="p-column-title">Item</span>
                {rowData.item}
            </>
        );
    };

    const aspekBodyTemplate = (rowData: Demo.Kategori) => {
        return (
            <>
                <span className="p-column-title">Aspek</span>
                {rowData.aspek}
            </>
        );
    };

    const indikatorBodyTemplate = (rowData: Demo.Kategori) => {
        return (
            <>
                <span className="p-column-title">Indikator</span>
                {rowData.indikator}
            </>
        );
    };

    const parameterBodyTemplate = (rowData: Demo.Kategori) => {
        return (
            <>
                <span className="p-column-title">Parameter</span>
                {rowData.parameter}
            </>
        );
    };

    const actionBodyTemplate = (rowData: Demo.Kategori) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteProduct(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Kategori Penilaian</h5>
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
                        <Column field="item" header="Item Penilaian" sortable body={itemBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="aspek" header="Aspek" sortable body={aspekBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="indikator" header="Indikator" sortable body={indikatorBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="parameter" header="Parameter" sortable body={parameterBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column header="Action" body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    {/* Edit nilai */}
                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Kategori Penilaian" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="Aspekpenilaian">Item Penilaian</label>
                            <InputText
                                id="aspekpenilaian"
                                value={kategori.item}
                                onChange={(e) => onInputChange(e, 'item')}
                                required
                                placeholder="Item Penilaian"
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !kategori.item
                                })}
                            />
                            {submitted && !kategori.item && <small className="p-invalid">Item Penilaian is required.</small>}
                        </div>

                        <div className="field col">
                            <label htmlFor="aspek">Aspek</label>
                            <InputNumber id="aspek" placeholder="Aspek" value={kategori.aspek} onValueChange={(e) => onInputNumberChange(e, 'aspek')} />
                        </div>

                        <div className="field col">
                            <label htmlFor="indikator">Indikator</label>
                            <InputNumber id="indikator" placeholder="Indikator" value={kategori.indikator} onValueChange={(e) => onInputNumberChange(e, 'indikator')} />
                        </div>

                        <div className="field col">
                            <label htmlFor="parameter">Parameter</label>
                            <InputNumber id="parameter" placeholder="Parameter" value={kategori.parameter} onValueChange={(e) => onInputNumberChange(e, 'parameter')} />
                        </div>
                    </Dialog>

                    {/* New nilai */}
                    <Dialog visible={newProductDialog} style={{ width: '450px' }} header=" Tambah Kategori Penilaian" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="Aspekpenilaian">Item Penilaian</label>
                            <InputText
                                id="aspekpenilaian"
                                value={kategori.item}
                                onChange={(e) => onInputChange(e, 'item')}
                                required
                                placeholder="Item Penilaian"
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !kategori.item
                                })}
                            />
                            {submitted && !kategori.item && <small className="p-invalid">Item Penilaian is required.</small>}
                        </div>

                        <div className="field col">
                            <label htmlFor="aspek">Aspek</label>
                            <InputNumber id="aspek" placeholder="Aspek" value={kategori.aspek} onValueChange={(e) => onInputNumberChange(e, 'aspek')} />
                        </div>

                        <div className="field col">
                            <label htmlFor="indikator">Indikator</label>
                            <InputNumber id="indikator" placeholder="Indikator" value={kategori.indikator} onValueChange={(e) => onInputNumberChange(e, 'indikator')} />
                        </div>

                        <div className="field col">
                            <label htmlFor="parameter">Parameter</label>
                            <InputNumber id="parameter" placeholder="Parameter" value={kategori.parameter} onValueChange={(e) => onInputNumberChange(e, 'parameter')} />
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {kategori && (
                                <span>
                                    Are you sure you want to delete <b>{kategori.item}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default KategoriPenilaian;
