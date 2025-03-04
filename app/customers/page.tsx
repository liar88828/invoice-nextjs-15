import React from 'react';
import { getContextQuery, getContextQueryNum } from "@/utils/param";
import { TContext } from "@/interface/param";
import { Table } from "@/app/customers/table";
import { Search } from "@/app/customers/search";
import { customerFindAll, customerFindCity } from "@/action/customer";

async function Page(context: TContext) {
    const page = await getContextQueryNum(context, 'page');
    const limit = await getContextQueryNum(context, 'limit');
    const search = await getContextQuery(context, 'search');
    const data = await customerFindAll({
        limit,
        page,
        name: await getContextQuery(context, 'name'),
        kota: await getContextQuery(context, 'kota'),
        search: search,
    })

    const city = await customerFindCity({ search })

    return (
        <Search city={ city.data }>
            <Table customers={ data.data }/>
        </Search>
    );
}

export default Page;