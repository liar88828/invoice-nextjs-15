'use client'
import React  from 'react';
import { PenIcon } from "lucide-react";
import { useProductStore } from "@/store/product";
import { productUpdateAction } from "@/action/product";
import { Products } from "@prisma/client";
import toast from "react-hot-toast";

export function Update({ product }: { product: Products }) {

    const { forms, setForms, resetForms } = useProductStore()

    const onCreate = async () => {
        try {
            // console.log(product);
            // console.log(forms)
             await productUpdateAction(forms, product.id)
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
                        const modal = document.getElementById(`modal_product_${product.id}`) as HTMLDialogElement;

                        if (modal) {
                            modal.showModal();
                                setForms({
                                    harga: product.harga,
                                    jumlah: product.jumlah,
                                    name: product.nama,
                                    keterangan:product.keterangan
                                })
                        }
                    } }>
                <PenIcon/>
            </button>
            <dialog id={ `modal_product_${product.id}` } className="modal">
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

