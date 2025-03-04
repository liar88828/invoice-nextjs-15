import React from 'react';
import Create from "@/app/invoices/create";
import { ProductSearch } from "@/app/invoices/product";
import { TContext } from "@/interface/param";
import { getContextQuery } from "@/utils/param";
import { CustomerSearch } from "@/app/invoices/customer";
import { invoiceCustomers, invoiceProducts } from "@/action/invoice";

async function Page(context: TContext) {
    const productSearch = await getContextQuery(context, 'productSearch')
    const customerSearch = await getContextQuery(context, 'customerSearch')
    const products = await invoiceProducts(productSearch);
    const customers = await invoiceCustomers(customerSearch);
    return (
        <>
            <Create/>
            <ProductSearch products={ products }/>
            <CustomerSearch customers={ customers }/>
        </>
    )
}

export default Page;