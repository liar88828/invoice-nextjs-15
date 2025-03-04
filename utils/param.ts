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

export async function getId({ params }: TContext) {
    const param = await params
    if (param) {
        return param.id
    }
    return ''
}

export async function getIdNum({ params }: TContext) {
    const param = await params
    if (param) {
        return Number(param.id)
    }
    return 0
}
