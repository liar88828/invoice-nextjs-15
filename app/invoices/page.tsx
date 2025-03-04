'use client'
import React from 'react';
import { useInvoiceStore } from "@/store/invoice";

function Page() {
    return (<FormInvoice/>);
}

export default Page;


export function FormInvoice() {
    const { fields, addField, removeField, updateField } = useInvoiceStore();


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = fields.map((field) => ({
            name: field.name,
            value: field.value,
        }));
        console.log("Submitted Data:", formData);
        // alert(JSON.stringify(formData, null, 2)); // Just for testing
    };
    return (
        <form onSubmit={ handleSubmit } className="p-4">
            <h2 className="text-xl font-bold mb-2">Dynamic Form</h2>
            { fields.map((field) => (
                <div key={ field.id } className="mb-2 flex gap-2">
                    <input
                        type="text"
                        value={ field.value }
                        onChange={ (e) => updateField(field.id, e.target.value) }
                        className="border p-2"
                        placeholder={ `Field ${ field.name }` }
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
            <button type="button" onClick={ addField } className="bg-blue-500 text-white p-2 mt-2">
                Tambah Field
            </button>
            <button type="submit" className="bg-green-500 text-white p-2 mt-2 ml-2">
                Submit
            </button>
        </form>
    );
}

