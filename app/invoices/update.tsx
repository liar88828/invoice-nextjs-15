'use client'
import React, { useEffect } from 'react';
import { invoiceUpdateAction } from "@/action/invoice";
import { toDateForm } from "@/utils/date";
import { toPrice } from "@/utils/price";
import { useInvoiceStore } from "@/store/invoice";
import toast from "react-hot-toast";
import { ProductTable } from "@/app/invoices/product";
import { CustomerTable } from "@/app/invoices/customer";
import { InvoiceResponseValid } from "@/schema/invoice";

export default function Update({ invoice }: { invoice: InvoiceResponseValid }) {
    const { invoiceField, calculate, setInvoiceField, customer, products, combineProps,resetForm } = useInvoiceStore()

    // Sync props with Zustand store when the component mounts or invoice changes
    useEffect(() => {
        if (invoice) {
            combineProps(invoice); // Assuming setInvoiceField can handle InvoiceResponse
        }
    }, [combineProps, invoice, setInvoiceField]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await invoiceUpdateAction({
                ...invoiceField,
                tanggal: new Date(invoiceField.tanggal),
                customer,
                products
            },
            invoice.id
        )
        // console.log(response)
        if (response.status) {
            toast.success("Invoice Updated successfully.")
            resetForm()
        } else {
            toast.error("Invoice Updated failed")
        }
    }
    return (
        <>
            <div className="card card-body">
                <h3 className="text-lg font-bold mb-5">Crete Invoice</h3>
                <form
                    onSubmit={ onSubmit } className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Tanggal Invoice</legend>
                            <input
                                value={ toDateForm(invoiceField.tanggal) }
                                onChange={ (e) => setInvoiceField({ tanggal: e.target.value }) }
                                type="datetime-local"
                                className="input w-full"
                                placeholder="Masukkan tanggal invoice"
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Status</legend>
                            <select
                                value={ invoiceField.status }
                                onChange={ (e) => setInvoiceField({ status: e.target.value }) }
                                className="select w-full"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Selesai">Selesai</option>
                                <option value="Dibatalkan">Dibatalkan</option>
                            </select>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Ongkir</legend>
                            <input
                                value={ invoiceField.ongkir }
                                onChange={ (e) => setInvoiceField({ ongkir: Number(e.target.value) }) }
                                type="number"
                                className="input w-full"
                                placeholder="Masukkan Ongkir"
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Discount</legend>
                            <input
                                value={ invoiceField.discount }
                                onChange={ (e) => setInvoiceField({ discount: Number(e.target.value) }) }
                                type="number"
                                className="input w-full"
                                placeholder="Masukkan Discount"
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Uang Muka</legend>
                            <input
                                value={ invoiceField.uang_muka }
                                onChange={ (e) => setInvoiceField({ uang_muka: Number(e.target.value) }) }
                                type="number"
                                className="input w-full"
                                placeholder="Masukkan Uang Muka"
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Note</legend>
                            <textarea
                                value={ invoiceField.notes }
                                onChange={ (e) => setInvoiceField({ notes: e.target.value }) }
                                className="textarea w-full"
                                placeholder="Masukkan Note"
                            ></textarea>
                        </fieldset>
                    </div>

                    <CustomerTable/>
                    <ProductTable/>

                    <div className="">
                        <h1 className="text-lg font-bold">
                            Total All Product : { toPrice(calculate.totalProducts) }
                        </h1>
                        <h1 className="text-lg font-bold">
                            Total With Ongkir : { toPrice(calculate.totalProductOngkir) }
                        </h1>
                        <h1 className="text-lg font-bold">
                            Total With Discount : { toPrice(calculate.totalAfterDiscount) }
                        </h1>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-info btn-block">
                        Save
                    </button>

                    <button
                        type="button"
                        onClick={ () => resetForm() }
                        className="btn btn-warning btn-block">
                        Reset
                    </button>
                </form>
            </div>
        </>
    );
}

