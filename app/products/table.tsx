'use client'
import React from 'react';
import type { Products } from "@prisma/client";
import { TrashIcon } from "lucide-react";
import { deleteProductAction } from "@/action/product";
import { Update } from "@/app/products/update";
import toast from "react-hot-toast";

export function Table({ products }: { products: Products[] }) {
    const onDelete = async (productId: number) => {
        if (confirm('Are you sure?')) {
            try {
                // console.log('delete id :' + product.id)
                await deleteProductAction(productId)
                toast.success('Product deleted')
            } catch (e) {
                if (e instanceof Error) {
                    toast.error(e.message)
                }
            }
        }
    }
    
    return (
        <div className="mt-6 overflow-x-auto ">
            <table className="table ">
                <thead>
                <tr className="uppercase text-sm">
                    {/*<th>select</th>*/ }
                    <th>Nama Produk</th>
                    <th>Harga</th>
                    <th>Jumlah</th>
                    <th>Keterangan</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {/*v-for="(prod, index) in products" :key="index"*/ }
                { products.map(product => (
                    <tr
                        key={ product.id }
                        className="hover:bg-base-200">
                        {/*<td> </td>*/ }
                        <td>{ product.nama } </td>
                        <td>{ product.harga } </td>
                        <td>{ product.jumlah } </td>
                        <td>{ product.keterangan } </td>
                        <td>
                            <div className="flex gap-2">
                                <button
                                    onClick={ () => onDelete(product.id) }
                                    className="btn btn-error btn-square"><TrashIcon/></button>
                                <Update product={ product }/>
                            </div>
                        </td>
                    </tr>
                )) }

                </tbody>
            </table>
        </div>
    );
}

