'use client'
import React from 'react';
import { PlusIcon } from "lucide-react";
import { useProductStore } from "@/store/product";
import { productCreateAction } from "@/action/product";
import toast from "react-hot-toast";

export function Create() {
    const { forms, setForms,resetForms } = useProductStore()
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
            const data = await productCreateAction(forms)
            if(data){
                toast.success('Successfully created product')
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
                        const modal = document.getElementById('modal_product') as HTMLDialogElement;
                        if (modal) {
                            modal.showModal();
                        }
                    } }>
             Create Product  <PlusIcon/>
            </button>
            <dialog id="modal_product" className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Please Add A New Product</h3>
                    <form className="space-y-4 "
                        // onSubmit={ onSubmit }
                    >
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Nama Produk</legend>
                            <input
                                value={ forms.name }
                                onChange={ (e) => setForms({ name: e.target.value }) }
                                type="text"
                                className="input w-full"
                                placeholder="Masukkan nama produk"
                            />
                            {/*<p className="fieldset-label">Wajib diisi</p>*/ }
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Harga</legend>
                            <input
                                value={ forms.harga }
                                onChange={ (e) => setForms({ harga: Number(e.target.value) }) }
                                type="number"
                                className="input w-full"
                                placeholder="Masukkan harga produk"
                            />
                            {/*<p className="fieldset-label">Gunakan angka</p>*/ }
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Jumlah</legend>
                            <input
                                value={ forms.jumlah }
                                onChange={ (e) => setForms({ jumlah: Number(e.target.value) }) }
                                type="number"
                                className="input w-full"
                                placeholder="Masukkan jumlah produk"
                            />
                            {/*<p className="fieldset-label">Berapa stok produk?</p>*/ }
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Keterangan</legend>
                            <textarea
                                value={ forms.keterangan }
                                onChange={ (e) => setForms({ keterangan: e.target.value }) }
                                className="textarea w-full"
                                placeholder="Masukkan keterangan produk"
                            ></textarea>
                            {/*<p className="fieldset-label">Opsional</p>*/ }
                        </fieldset>

                        <button
                            type="button"
                            onClick={ ()=>onCreate() }
                            className="btn btn-info btn-block"
                        >
                            Simpan
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

