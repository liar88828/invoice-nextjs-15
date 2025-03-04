import { TContext } from "@/interface/param";

export async function getContextQuery({ searchParams }: TContext, text: keyof Awaited<TContext['searchParams']>) {
    const searchParam = await searchParams
    if (searchParam && text in searchParam) {
        return searchParam[text]
    }
    return ''
}

export async function getContextQueryNum({ searchParams }: TContext, text: keyof Awaited<TContext['searchParams']>) {
    const searchParam = await searchParams
    if (searchParam && text in searchParam) {
        return Number(searchParam[text])
    }
    return 1
}

