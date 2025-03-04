'use client'
import React from 'react';
import { PenIcon, PrinterIcon, TrashIcon } from "lucide-react";
import toast from "react-hot-toast";
import { toDate } from "@/utils/date";
import { toPrice } from "@/utils/price";
import Link from "next/link";
import { Invoices } from "@prisma/client";
import { invoiceDeleteAction } from "@/action/invoice";

export function Table({ invoices }: { invoices: Invoices[] }) {
    const onDelete = async (invoiceId: number) => {
        if (confirm('Are you sure?')) {
            try {
                // console.log('delete id :' + product.id)
                await invoiceDeleteAction(invoiceId)
                toast.success('Invoice deleted')
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
                    <th>Id</th>
                    <th>Tanggal</th>
                    <th>Ongkir</th>
                    <th>Diskon</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {/*v-for="(prod, index) in products" :key="index"*/ }
                { invoices.map(item => (
                    <tr key={ item.id } className="hover:bg-base-200">
                        <td>{ item.id }</td>
                        <td>{ toDate(item.tanggal_invoice) } </td>
                        <td>{ toPrice(item.ongkir) } </td>
                        <td>{ item.discount } </td>
                        <td>{ toPrice(item.total) } </td>
                        <td>{ item.status } </td>
                        <td>
                            <div className="flex gap-2">
                                <button
                                    onClick={ () => onDelete(item.id) }
                                    className="btn btn-error btn-square"><TrashIcon/>
                                </button>
                                <Link
                                    className="btn btn-accent btn-square"
                                    href={ `/invoices/form/${ item.id }` }>
                                    <PenIcon/>
                                </Link>

                                <Link
                                    className="btn btn-primary btn-square"
                                    href={ `/invoices/print/${ item.id }` }>
                                    <PrinterIcon/>
                                </Link>
                            </div>
                        </td>
                    </tr>
                )) }

                </tbody>
            </table>
        </div>
    );
}

