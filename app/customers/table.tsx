'use client'
import React from 'react';
import type { Customers } from "@prisma/client";
import { TrashIcon } from "lucide-react";
import { customerDeleteAction } from "@/action/customer";
import { Update } from "@/app/customers/update";
import toast from "react-hot-toast";

export function Table({ customers }: { customers: Customers[] }) {
    const onDelete = async (customerId: number) => {
        if (confirm('Are you sure?')) {
            try {
                // console.log('delete id :' + product.id)
                await customerDeleteAction(customerId)
                toast.success('Customer deleted')
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
                    <th>Nama Customer</th>
                    <th>Telephone</th>
                    <th>Kota</th>
                    <th>Alamat</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {/*v-for="(prod, index) in products" :key="index"*/ }
                { customers.map(customer => (
                    <tr
                        key={ customer.id }
                        className="hover:bg-base-200">
                        {/*<td> </td>*/ }
                        <td>{ customer.nama } </td>
                        <td>{ customer.tlp } </td>
                        <td>{ customer.kota } </td>
                        <td>{ customer.alamat } </td>
                        <td>
                            <div className="flex gap-2">
                                <button
                                    onClick={ () => onDelete(customer.id) }
                                    className="btn btn-error btn-square"><TrashIcon/></button>
                                <Update customer={ customer }/>
                            </div>
                        </td>
                    </tr>
                )) }

                </tbody>
            </table>
        </div>
    );
}

