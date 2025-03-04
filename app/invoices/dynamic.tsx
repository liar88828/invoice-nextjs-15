'use client'
import React from 'react';
import { useInvoiceStore } from "@/store/invoice";

function Page() {
    return (<FormInvoice/>);
}

export default Page;

export function FormInvoice() {
    const { products, addField, removeField, updateField } = useInvoiceStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = products.map((field) => ({
            value: field.jumlah,
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
                        onChange={ (e) => updateField(field.id, {nama: e.target.value }) }
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
            <button type="button" onClick={ ()=>addField() } className="bg-blue-500 text-white p-2 mt-2">
                Tambah Field
            </button>
            <button type="submit" className="bg-green-500 text-white p-2 mt-2 ml-2">
                Submit
            </button>
        </form>
    );
}

