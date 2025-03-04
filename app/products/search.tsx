'use client'
import React, { useEffect } from 'react';
import { useProductStore } from "@/store/product";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Create } from "@/app/products/create";

export function Search({ children }: { children: React.ReactNode }) {
    const { params, setParams } = useProductStore()
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
        router.push(`/products?${ data }`);
    }, [ router, debouncedParams ]); // ✅ Runs when `debouncedParams` changes

    return (<>

            <h2 className="card-title">Menu Produk</h2>
            <div className="flex justify-between flex-wrap gap-2">
                {/*<div className="join w-full max-w-xs">*/ }
                <input type="search"
                       value={ params.search }
                       onChange={ (e) => setParams({ search: e.target.value }) }
                    // input-bordered join-item
                       className="input "
                       placeholder="Search Product"
                />
                {/*<button*/ }
                {/*    onClick={ () => {*/ }
                {/*        const data = new URLSearchParams(*/ }
                {/*            Object.entries(params).map(([ key, value ]) => [ key, String(value) ])*/ }
                {/*        );*/ }
                {/*        console.log(data)*/ }
                {/*        router.push(`/products?${ data }`)*/ }
                {/*    } }*/ }
                {/*    className="btn btn-info join-item">*/ }
                {/*    <SearchIcon/>*/ }
                {/*</button>*/ }
                {/*</div>*/ }

                <select
                    value={ params.price }
                    onChange={ (e) => setParams({ price: e.target.value }) }
                    className="select w-full max-w-xs">
                    <option value={ '' }>Price</option>
                    <option>Low</option>
                    <option>High</option>
                </select>

                <select
                    value={ params.name }
                    onChange={ (e) => setParams({ name: e.target.value }) }
                    className="select w-full max-w-xs"
                >
                    <option value="">Name</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>

                <Create/>
            </div>
            { children }
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
        ;
}

