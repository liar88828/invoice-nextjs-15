'use client'
import React from 'react';
import { PlusIcon } from "lucide-react";
import { productCreateAction } from "@/action/product";
import toast from "react-hot-toast";
import { useCustomerStore } from "@/store/customer";
import { customerCreateAction } from "@/action/customer";

export function Create() {
    const { forms, setForms,resetForms } = useCustomerStore()
    // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     try {
    //         console.log(forms)
    //         const data = await productCreateAction(forms)
    //         console.log(data)
    //     } catch (err) {
    //         // console.log(err.message)
    //     }
    // }

    const onCreate = async () => {
        try {
            // console.log(forms)
            const data = await customerCreateAction(forms)
            if(data){
                toast.success('Successfully created Customer')
            }
            // console.log(data)
            resetForms()
        } catch (err) {
            if (err instanceof Error) {
                // console.log(err.message)
                toast.success(err.message)

            }

        }
    }

    return (<>
            <button className="btn btn-info "
                    onClick={ () => {
                        const modal = document.getElementById('modal_customer') as HTMLDialogElement;
                        if (modal) {
                            modal.showModal();
                        }
                    } }>
             Create Customer  <PlusIcon/>
            </button>
            <dialog id="modal_customer" className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Please Add A New Customer</h3>
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

