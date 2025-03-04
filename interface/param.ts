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

    }>,
    params: Promise<{ id: string, search: string, route: string }>
}