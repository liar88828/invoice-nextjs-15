import React from 'react';
import Invoice, { PrintComponent } from "@/app/invoices/print";
import { InvoiceFindById } from "@/action/invoice";
import { TContext } from "@/interface/param";
import { getIdNum } from "@/utils/param";

async function Page(context: TContext) {
    const id = await getIdNum(context);
    const invoice = await InvoiceFindById(id)

    return (
        <PrintComponent href={ '/invoices' }>
            <Invoice invoice={ invoice }/>
        </PrintComponent>
    );
}

export default Page;