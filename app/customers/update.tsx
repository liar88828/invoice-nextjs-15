'use client'
import React from 'react';
import toast from "react-hot-toast";
import { PenIcon } from "lucide-react";
import { useCustomerStore } from "@/store/customer";
import { Customers } from "@prisma/client";
import { customerUpdateAction } from "@/action/customer";

export function Update({ customer }: { customer: Customers }) {

    const { forms, setForms, resetForms } = useCustomerStore()

    const onCreate = async () => {
        try {
            // console.log(product);
            // console.log(forms)
            await customerUpdateAction(forms, customer.id)
            // console.log(data)
            resetForms()
            toast.success("Product updated!")
        } catch (err) {
            if (err instanceof Error) {
                // console.log(err.message)
                toast.error(err.message)
            }
        }
    }
    // useEffect(() => {
    //     setForms({
    //         harga: product.harga,
    //         jumlah: product.jumlah,
    //         name: product.nama,
    //         keterangan:product.keterangan
    //     })
    //     console.log(product)
    // }, [product,setForms])
    return (<>
            <button className="btn btn-accent btn-square"
                    onClick={ () => {
                        const modal = document.getElementById(`modal_customer_${ customer.id }`) as HTMLDialogElement;

                        if (modal) {
                            modal.showModal();
                            setForms({
                                name: customer.nama,
                                tlp: customer.tlp,
                                kota: customer.kota,
                                alamat: customer.alamat
                            })
                        }
                    } }>
                <PenIcon/>
            </button>
            <dialog id={ `modal_customer_${ customer.id }` } className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Please Add A New Product</h3>

                    <form className="space-y-4 "
                        // onSubmit={ onSubmit }
                    >
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Nama Customer</legend>
                            <input
                                value={ forms.name }
                                onChange={ (e) => setForms({ name: e.target.value }) }
                                type="text"
                                className="input w-full"
                                placeholder="Masukkan nama Customer"
                            />
                            {/*<p className="fieldset-label">Wajib diisi</p>*/ }
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Telephone</legend>
                            <input
                                value={ forms.tlp }
                                onChange={ (e) => setForms({ tlp: e.target.value }) }
                                type="tlp"
                                pattern="[0-9]*" minLength={ 10 } maxLength={15}
                                className="input w-full"
                                placeholder="Masukkan Telepnone Customer"
                            />
                            {/*<p className="fieldset-label">Gunakan angka</p>*/ }
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Kota</legend>
                            <input
                                value={ forms.kota }
                                onChange={ (e) => setForms({ kota: e.target.value }) }
                                type="text"
                                className="input w-full"
                                placeholder="Masukkan Kota Customer"
                            />
                            {/*<p className="fieldset-label">Berapa stok produk?</p>*/ }
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Alamat</legend>
                            <textarea
                                value={ forms.alamat }
                                onChange={ (e) => setForms({ alamat: e.target.value }) }
                                className="textarea w-full"
                                placeholder="Masukkan Alamat Customer"
                            ></textarea>
                            {/*<p className="fieldset-label">Opsional</p>*/ }
                        </fieldset>

                        <button
                            type="button"
                            onClick={ () => onCreate() }
                            className="btn btn-info btn-block"
                        >
                            Update
                        </button>
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>

    );
}

