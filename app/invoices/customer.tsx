'use client'
import { useInvoiceStore } from "@/store/invoice";
import { CheckIcon, SearchIcon, XIcon } from "lucide-react";
import Form from "next/form";
import React from "react";
import { Customers } from "@prisma/client";

export function CustomerTable() {
    const { customer, setCustomerPartial } = useInvoiceStore()
    return (<>
            <div className="flex justify-between ">
                <div className="space-x-2">
                    <button type="button" onClick={ searchCustomer } className="btn btn-success">
                        Cari Customer
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table bg-base-200 table-xs">
                    <thead>
                    <tr className="uppercase text-sm">
                        <th>Nama Customer</th>
                        <th>Telephone</th>
                        <th>Kota</th>
                        <th>Alamat</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="hover:bg-base-200/90">

                        <td>
                            <input type="text"
                                   className={ 'input' }
                                   value={ customer.nama }
                                   onChange={ e => setCustomerPartial({ nama: e.target.value }) }
                            />
                        </td>
                        <td>
                            {/*{ toPrice(customer.harga) }*/ }
                            <input type="tlp"
                                   className={ 'input' }
                                   value={ customer.tlp }
                                   onChange={ e => setCustomerPartial({ tlp: e.target.value }) }
                            />
                        </td>
                        <td>
                            <input type="text"
                                   className={ 'input' }
                                   value={ customer.kota }
                                   onChange={ e => setCustomerPartial({ kota: e.target.value }) }
                            />
                        </td>

                        <td>
                            <input type="text"
                                   className={ 'input' }
                                   value={ customer.alamat }
                                   onChange={ e => setCustomerPartial({ alamat: e.target.value }) }
                            />
                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>
        </>

    )
}

export const searchCustomer = () => {
    const modal = document.getElementById('my_modal_customer') as HTMLDialogElement;
    if (modal) {
        modal.showModal();
    }
}

export const closeCustomerModal = () => {
    const modal = document.getElementById('my_modal_customer') as HTMLDialogElement;
    if (modal) {
        modal.close();
    }
}

export function CustomerSearch({ customers }: { customers: Customers[] }) {
    const { customer: customerStore, setCustomer } = useInvoiceStore()
    return (
        <>
            <dialog id="my_modal_customer" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="text-lg font-bold">Please select the Customer</h3>
                    <div className="flex justify-between">
                        <Form action={ '/invoices/form' } className="join">
                            <input
                                type="search"
                                name={ 'customerSearch' }
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
                                <th>Nama Customer</th>
                                <th>Telephone</th>
                                <th>Kota</th>
                                <th>Alamat</th>
                            </tr>
                            </thead>
                            <tbody>
                            { customers
                            .filter((item) => customerStore.id !== item.id)
                            .map(item => (
                                <tr className="hover:bg-base-200/90" key={ item.id }>
                                    <td>
                                        <button
                                            onClick={ () => {
                                                setCustomer(item)
                                                closeCustomerModal()
                                            } }
                                            className="btn btn-info btn-square btn-sm">
                                            <CheckIcon/>
                                        </button>
                                    </td>
                                    <td>{ item.nama }</td>
                                    <td>{ item.tlp }</td>
                                    <td>{ item.kota }</td>
                                    <td>{ item.alamat }</td>
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

