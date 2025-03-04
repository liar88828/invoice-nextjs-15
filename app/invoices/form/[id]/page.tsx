import React from 'react';
import { ProductSearch } from "@/app/invoices/product";
import { TContext } from "@/interface/param";
import { getContextQuery, getIdNum } from "@/utils/param";
import { CustomerSearch } from "@/app/invoices/customer";
import { invoiceCustomers, InvoiceFindById, invoiceProducts } from "@/action/invoice";
import Update from "@/app/invoices/update";
import Loading from "@/app/components/Loading";

async function Page(context: TContext) {
    const id = await getIdNum(context)
    const productSearch = await getContextQuery(context, 'productSearch')
    const customerSearch = await getContextQuery(context, 'customerSearch')
    const products = await invoiceProducts(productSearch);
    const customers = await invoiceCustomers(customerSearch);
    const invoice = await InvoiceFindById(id)
    if (!invoice.Invoice_customers) {
        return <Loading/>
    }
    return (
        <>
            <Update invoice={ invoice }/>
            <ProductSearch products={ products }/>
            <CustomerSearch customers={ customers }/>
        </>
    )
}

export default Page;