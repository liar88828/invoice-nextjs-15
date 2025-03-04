import React from 'react';
import { productFindAll } from "@/action/product";
import { getContextQuery, getContextQueryNum } from "@/utils/param";
import { TContext } from "@/interface/param";
import { Table } from "@/app/products/table";
import { Search } from "@/app/products/search";

async function Page(context: TContext) {
    const page = await getContextQueryNum(context, 'page');
    const limit = await getContextQueryNum(context, 'limit');
    const data = await productFindAll({
        limit,
        page,
        name: await getContextQuery(context, 'name'),
        price: await getContextQuery(context, 'price'),
        search: await getContextQuery(context, 'search'),
    })

    return (
            <Search>
                <Table products={ data.data }/>
            </Search>
    );
}

export default Page;