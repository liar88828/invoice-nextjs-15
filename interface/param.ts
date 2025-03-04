export type TContext = {
    searchParams: Promise<{
        option:string
        name: string;
        search: string,
        status: string,
        redirect: string,
        query: string,
        page: string,
        limit: string,
        price: string,
        kota: string
        startDate: string,
        endDate: string,
        productSearch: string,
        customerSearch: string

    }>,
    params: Promise<{
        id: string,
        route: string
    }>
}

export type ResponseAction<T = never> = Promise<{
    message: string,
    status: boolean,
    error?: string | string[],
    data?: T,
    meta?: {
        currentPage: number
        pageSize: number
        totalPages: number
        totalCount: number
    }
}>;
