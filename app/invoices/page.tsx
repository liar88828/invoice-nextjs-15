import React from 'react';
import { getContextQuery, getContextQueryNum } from "@/utils/param";
import { TContext } from "@/interface/param";
import { invoiceFindAll } from "@/action/invoice";
import { Search } from "@/app/invoices/search";
import { Table } from "@/app/invoices/table";
import Loading from "@/app/components/Loading";

async function Page(context: TContext) {
    const page = await getContextQueryNum(context, 'page');
    const limit = await getContextQueryNum(context, 'limit');
    const search = await getContextQuery(context, 'search');
    const invoices = await invoiceFindAll({
        limit,
        page,
        status: await getContextQuery(context, 'status'),
        startDate: await getContextQuery(context, 'startDate'),
        endDate: await getContextQuery(context, 'endDate'),
        search: search,
    })
    if (!invoices.data) {
        return <Loading/>
    }
    return (
        <Search invoice={invoices.data}>
            <Table invoices={ invoices.data }/>
        </Search>
    );
}

export default Page;