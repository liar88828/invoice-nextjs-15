'use client'
import React from 'react';
import { useInvoiceStore } from "@/store/invoice";
import { CheckIcon, SearchIcon, XIcon } from "lucide-react";
import { toPrice } from "@/utils/price";
import { Products } from "@prisma/client";
import Form from "next/form";

export function ProductTablex() {
    const { products, addField, removeField, updateField } = useInvoiceStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = products.map((field) => ({
            value: field.nama,
        }));
        console.log("Submitted Data:", formData);
        // alert(JSON.stringify(formData, null, 2)); // Just for testing
    };
    return (
        <form onSubmit={ handleSubmit } className="p-4">
            <h2 className="text-xl font-bold mb-2">Dynamic Form</h2>
            { products.map((field) => (
                <div key={ field.id } className="mb-2 flex gap-2">
                    <input
                        type="text"
                        value={ field.nama }
                        onChange={ (e) => updateField(field.id, { nama: e.target.value }) }
                        className="border p-2"
                        placeholder={ `Field  ` }
                    />
                    <button
                        type="button"
                        onClick={ () => removeField(field.id) }
                        className="bg-red-500 text-white p-2"
                    >
                        Hapus
                    </button>
                </div>
            )) }
            <button type="button" onClick={ () => addField() } className="bg-blue-500 text-white p-2 mt-2">
                Tambah Field
            </button>
            <button type="submit" className="bg-green-500 text-white p-2 mt-2 ml-2">
                Submit
            </button>
        </form>
    );
}

export function ProductTable() {
    const { products, addField, removeField, updateField } = useInvoiceStore()
    return (<>
            <div className="flex justify-between ">
                <h1 className="text-error text-xl">{ products.length === 0 && 'Please Select' }</h1>
                <div className="space-x-2">
                    <button type="button" onClick={ searchProduct } className="btn btn-success">
                        Cari Product
                    </button>
                    <button type="button" onClick={ () => addField() } className="btn btn-info">
                        Tambah Product
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">

                <table className="table bg-base-200 table-xs">
                    <thead>
                    <tr className="uppercase text-sm">
                        <th>Action</th>
                        <th>Nama product</th>
                        <th>Harga</th>
                        <th>Jumlah</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    { products.map(item => (
                        <tr className="hover:bg-base-200/90" key={ item.id }>
                            <td>
                                <div className="flex justify-start items-stretch">
                                    <button
                                        onClick={ () => removeField(item.id) }
                                        type="button"
                                        className="btn btn-error btn-square btn-sm">
                                        <XIcon/>
                                    </button>
                                </div>
                            </td>
                            <td>
                                <input type="text"
                                       className={ 'input' }
                                       value={ item.nama }
                                       onChange={ e => updateField(item.id, { nama: e.target.value }) }
                                />
                            </td>
                            <td>
                                {/*{ toPrice(item.harga) }*/ }
                                <input type="text"
                                       className={ 'input' }
                                       value={ item.harga }
                                       onChange={ e => updateField(item.id, { harga: Number(e.target.value) }) }
                                />
                            </td>
                            <td>
                                {/*<div className="flex justify-center gap-2 items-center">*/ }
                                {/*<button*/ }
                                {/*    onClick={ () => decrement(item.id) }*/ }
                                {/*    type="button"*/ }
                                {/*    className="btn btn-sm btn-error btn-square">*/ }
                                {/*    <MinusIcon/>*/ }
                                {/*</button>*/ }
                                {/*<span>{ item.jumlah } </span>*/ }

                                <input type="text"
                                       className={ 'input' }
                                       value={ item.jumlah }
                                       onChange={ e => updateField(item.id, { jumlah: Number(e.target.value) }) }
                                />
                                {/*<button*/ }
                                {/*    onClick={ () => increment(item.id) }*/ }
                                {/*    type="button"*/ }
                                {/*    className="btn btn-sm btn-success btn-square">*/ }
                                {/*    <PlusIcon/>*/ }
                                {/*</button>*/ }
                                {/*</div>*/ }
                            </td>
                            <td>{ toPrice(item.jumlah * item.harga) } </td>
                            <td>{ item.keterangan } </td>
                        </tr>
                    )) }

                    </tbody>
                </table>
            </div>
        </>

    )
}

export const searchProduct = () => {
    const modal = document.getElementById('my_modal_product') as HTMLDialogElement;
    if (modal) {
        modal.showModal();
    }
}

export function ProductSearch({ products }: { products: Products[] }) {
    const { products: productStore, addField } = useInvoiceStore()
    return (
        <>
            <dialog id="my_modal_product" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="text-lg font-bold">Please select the Product</h3>
                    <div className="flex justify-between">
                        <Form action={ '/invoices/form' } className="join">
                            <input
                                type="search"
                                name={ 'productSearch' }
                                className="input input-bordered join-item"/>
                            <button
                                className="join-item btn btn-info">
                                <SearchIcon/>
                            </button>
                        </Form>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                <XIcon/>
                            </button>
                        </form>
                    </div>

                    <div className="mt-6 overflow-x-auto w-full">
                        <table className="table table-xs">
                            <thead>
                            <tr className="uppercase text-sm">
                                <th>Action</th>
                                <th>Nama product</th>
                                <th>Harga</th>
                                <th>Jumlah</th>
                                <th>Keterangan</th>
                            </tr>
                            </thead>
                            <tbody>
                            { products
                            .filter((item) => !productStore.some((p) => p.id === item.id))
                            .map(item => (
                                <tr className="hover:bg-base-200/90" key={ item.id }>
                                    <td>
                                        <button
                                            onClick={ () => addField(item) }
                                            className="btn btn-info btn-square btn-sm">
                                            <CheckIcon/>
                                        </button>
                                    </td>
                                    <td>{ item.nama }</td>
                                    <td>{ item.harga }</td>
                                    <td>{ item.jumlah }</td>
                                    <td>{ item.keterangan }</td>
                                </tr>
                            )) }
                            </tbody>
                        </table>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>

                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </div>
            </dialog>
        </>
    )
}

