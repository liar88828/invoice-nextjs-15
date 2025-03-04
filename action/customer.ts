'use server'

import prisma from "@/lib/prisma";
import { GetCustomerParam } from "@/interface/action";
import { revalidatePath } from "next/cache";
import { CustomerForms } from "@/store/customer";

export async function customerFindAll(query: GetCustomerParam) {
    // console.log(query);
    try {
        const page = Number(query.page) || 1
        const pageSize = Number(query.limit) ?? 10 // Set the page size
        const skip = (page - 1) * pageSize
        const products = await prisma.customers.findMany({
            skip,
            take: pageSize,
            orderBy: [
                {
                    nama: query.name === '' ? undefined
                        : query.name === 'A-Z' ? 'asc' : 'desc',
                },

            ],
            where: {
                nama: {
                    contains: query.search ?? ''
                },
                kota: {
                    contains: query.kota === 'City' ? undefined : query.kota,
                }
            },
        })

        const totalCount = await prisma.customers.count({
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

export async function customerFindCity(query: { search: string }): Promise<{
    message: string
    status: boolean
    data: string[]

}> {
    try {
        const customersCity = await prisma.customers.groupBy({
            by: [ 'kota' ],
            where: {
                nama: {
                    contains: query.search ?? '',
                },
            }
        })
        .then(data => {
            return data.map(item => (item.kota))
        })

        return {
            message: "Success Find Data Customers City",
            status: true,
            data: customersCity,
        }
    } catch (e: unknown) {
        if (e instanceof Error) {
            return {
                data: [],
                message: "Fail Get Customer city ",
                status: false
            }
        }
        return {
            data: [],
            message: "Something went wrong",
            status: false
        }

    }

}

export async function customerCreateAction(customer: CustomerForms) {
    const response = await prisma.customers.create({
        data: {
            nama: customer.name,
            tlp: customer.tlp,
            kota: customer.kota,
            alamat: customer.alamat
        }
    })
    if (!response) {
        throw new Error('Error Create Product')
    }
    revalidatePath('/')
    return response
}

export async function customerDeleteAction(customerId: number) {
    // const isFound=await
    const response = await prisma.customers.delete({ where: { id: customerId } })
    if (!response) {
        throw new Error('Error Delete Product')
    }
    revalidatePath('/')
    return response
}

export async function customerUpdateAction(customer: CustomerForms, customerId: number) {
    const response = await prisma.customers.update({
        where: { id: customerId },
        data: {
            nama: customer.name,
            tlp: customer.tlp,
            kota: customer.kota,
            alamat: customer.alamat
        }
    })
    if (!response) {
        throw new Error('Error Create Product')
    }
    revalidatePath('/')
    return response
}
