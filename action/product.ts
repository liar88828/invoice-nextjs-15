'use server'

import prisma from "@/lib/prisma";
import { GetProductParam } from "@/interface/action";
import { ProductForms } from "@/store/product";
import { revalidatePath } from "next/cache";

export async function productFindAll(query: GetProductParam) {
    try {
        const page = Number(query.page) || 1
        const pageSize = Number(query.limit) ?? 10 // Set the page size
        const skip = (page - 1) * pageSize
        const products = await prisma.products.findMany({
            skip,
            take: pageSize,
            orderBy: [
                {
                    nama: query.name === '' ? undefined
                        : query.name === 'A-Z' ? 'asc' : 'desc',
                },

                {
                    harga: query.price === '' ? undefined
                        : query.price === 'Low' ? 'asc' : 'desc'
                }
            ],
            where: {
                nama: {
                    contains: query.search ?? ''
                },
            },
        })

        const totalCount = await prisma.products.count({
            where: {
                nama: {
                    contains: query.search ?? "",
                },
            },
        })

        return {
            message: "Success Find Data Product",
            status: true,
            data: products,
            meta: {
                currentPage: page,
                pageSize,
                totalPages: Math.ceil(totalCount / pageSize),
                totalCount,
            },
        }
    } catch (e: unknown) {
        return {
            data: [],
            message: `Fail : ${ e } `,
            status: false
        }
    }
}

export async function productCreateAction(product: ProductForms) {
    const response = await prisma.products.create({
        data: {
            nama: product.name,
            harga: product.harga,
            jumlah: product.jumlah,
            keterangan: product.keterangan,
        }
    })
    if (!response) {
        throw new Error('Error Create Product')
    }
    revalidatePath('/')
    return response
}

export async function deleteProductAction(productId: number) {
    // const isFound=await
    const response = await prisma.products.delete({ where: { id: productId } })
    if (!response) {
        throw new Error('Error Delete Product')
    }
    revalidatePath('/')
    return response
}

export async function productUpdateAction(product: ProductForms, productId: number) {
    const response = await prisma.products.update({
        where: { id: productId },
        data: {
            nama: product.name,
            harga: product.harga,
            jumlah: product.jumlah,
            keterangan: product.keterangan,
        }
    })
    if (!response) {
        throw new Error('Error Create Product')
    }
    revalidatePath('/')
    return response
}
