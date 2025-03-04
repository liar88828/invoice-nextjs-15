'use client'
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useInvoiceStore } from "@/store/invoice";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import ExportToExcel from "@/app/invoices/excel";
import { InvoiceResponse } from "@/schema/invoice";

export function Search({ children, invoice }: { invoice: InvoiceResponse[], children: React.ReactNode }) {
    const { params, setParams } = useInvoiceStore()
    const router = useRouter();
    const { page, limit } = params;

    const handlePrevPage = () => {
        if (page > 1) {
            setParams({ page: page - 1 });
        }
    };

    const handleNextPage = () => {
        setParams({ page: page + 1 });
    };

    const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setParams({ limit: Number(e.target.value) });
    };

    const [ debouncedParams ] = useDebounce(params, 300); // Wait 300ms before updating

    useEffect(() => {
        const data = new URLSearchParams(
            Object.entries(debouncedParams).map(([ key, value ]) => [ key, String(value) ])
        );
        console.log(data);
        router.push(`/invoices?${ data }`);

    }, [ debouncedParams, router ]); // ✅ Runs when `debouncedParams` changes

    return (<>
            <h2 className="card-title">Menu Customer</h2>
            <div className="flex justify-between flex-wrap gap-2 items-end">
                <div className="form-control w-fit">
                    <label className=" text-sm font-medium">Status</label>
                    <select
                        value={ params.status }
                        onChange={ (e) => setParams({ status: e.target.value }) }
                        className="select select-bordered w-full"
                    >
                        <option value={ '' }>Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Dibatalkan">Dibatalkan</option>
                    </select>
                </div>
                <div className="form-control">
                    <label className="text-sm font-medium">Date Start</label>
                    <input
                        value={ params.startDate }
                        onChange={ (e) => setParams({ startDate: e.target.value }) }
                        type="datetime-local"
                        className="input input-bordered"
                        placeholder="Masukkan nama tanggal invoice"
                    />
                </div>

                <div className="form-control">
                    <label className="text-sm font-medium">Date End</label>
                    <input
                        value={ params.endDate }
                        onChange={ (e) => setParams({ endDate: e.target.value }) }
                        type="datetime-local"
                        className="input input-bordered"
                        placeholder="Masukkan nama tanggal invoice"
                    />
                </div>
                <ExportToExcel invoiceData={ invoice }/>
                <Link href={ '/invoices/form' } className="btn btn-info ">Create Invoice <PlusIcon/></Link>
            </div>
            {
                children
            }
            <div className="flex justify-between flex-wrap gap-2">
                {/* Pagination */ }
                <div className="join">
                    <button className="join-item btn btn-outline" onClick={ handlePrevPage } disabled={ page === 0 }>
                        «
                    </button>
                    <button className="join-item btn btn-outline">Page { page }</button>
                    <button className="join-item btn btn-outline" onClick={ handleNextPage }>
                        »
                    </button>
                </div>

                {/* Limit Selector */ }
                <select value={ limit } onChange={ handleLimitChange }
                        className="select select-bordered w-full max-w-xs">
                    <option disabled>Choose limit</option>
                    <option value="10">10</option>
                    <option value="100">100</option>
                    <option value="1000">1000</option>
                    <option value="100000">100000</option>
                </select>
            </div>
        </>
    )
}
