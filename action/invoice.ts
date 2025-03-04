'use server'

import prisma from "@/lib/prisma";
import { GetInvoiceParam } from "@/interface/action";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { invoiceBodySchemaCreate, InvoiceResponse, InvoiceResponseValid, InvoiceSchemaType } from "@/schema/invoice";
import { ResponseAction } from "@/interface/param";

export async function invoiceFindAll(query: GetInvoiceParam): ResponseAction<InvoiceResponse[]> {
    try {
        // console.log(query)
        const page = query.page || 1
        const pageSize = query.limit ?? 10 // Set the page size
        const skip = (page - 1) * pageSize
        const startDate = query.startDate ? new Date(query.startDate) : undefined;//please +1
        const endDate = query.endDate ? new Date(query.endDate) : undefined;//please -1
        // console.log(startDate, endDate)
        // startDate : 2025-02-15T14:00  , endDate : 2025-02-13T14:00

        const invoices = await prisma.invoices.findMany({
            skip,
            take: pageSize,
            include: {
                Invoice_customers: true,
                Invoice_products: true,
            },
            where: {
                createdAt: {
                    gte: startDate, // greater than or equal to startDate
                    lte: endDate,   // less than or equal to endDate
                },
                status: {
                    contains: query.status === '' ? undefined : query.status,
                },
            },
        })
        // console.log(invoices)
        const totalCount = await prisma.invoices.count({
            where: {
                createdAt: {
                    gte: startDate, // greater than or equal to startDate
                    lte: endDate,   // less than or equal to endDate
                },
                status: {
                    contains: query.search === '' ? undefined : query.search,
                },
            },
        })

        return {
            message: "Success Find Data Invoice",
            status: true,
            data: invoices,
            meta: {
                currentPage: page,
                pageSize,
                totalPages: Math.ceil(totalCount / pageSize),
                totalCount,
            },
        }
    } catch (e: unknown) {
        if (e instanceof z.ZodError) {
            return {
                message: "Error Validation",
                error: e.flatten().formErrors,
                status: false
            }
        }

        if (e instanceof Error) {
            return {
                message: e.message,
                error: "",
                status: false
            }
        }
        return {
            message: `Fail Find Data Invoice by Id `,
            error: "",
            status: false
        }
    }
}

export async function InvoiceFindById(id: number) {
    return prisma.invoices.findUnique({
        where: { id: id },
        include: {
            Invoice_customers: true,
            Invoice_products: true,
        },
    }).then((data): InvoiceResponseValid => {
        if (!data) {
            throw new Error('Data Invoice is not found');
        }
        if (data.Invoice_products.length === 0) {
            throw new Error('Data Invoice Product is empty');
        }
        if (data.Invoice_customers === null || !data.Invoice_customers) {
            throw new Error('Data Invoice Customer is not found');
        }
        return { ...data, Invoice_customers: data.Invoice_customers! };
    });
}

export async function invoiceProducts(productSearch: string) {
    return prisma.products.findMany({
        where: {
            nama: {
                contains: productSearch ?? ''
            },
        },
        take: 100
    });
}

export async function invoiceCustomers(customerSearch: string) {
    return prisma.customers.findMany({
        where: {
            nama: {
                contains: customerSearch ?? ''
            },
        },
        take: 100
    });
}

export async function invoiceCreateAction(invoice: InvoiceSchemaType) {
    try {
        const { customer: customerValid, products: productsValid, ...data } = invoiceBodySchemaCreate.parse(invoice)
        await prisma.$transaction(async (tx) => {
            const invoice = await tx.invoices.create({
                data: {
                    tanggal_invoice: data.tanggal,
                    ongkir: data.ongkir,
                    discount: data.discount,
                    total: data.total,
                    uang_muka: data.uang_muka,
                    notes: data.notes,
                    status: data.status,
                }
            })

            const productDB = productsValid.map((item) => {
                return {
                    nama: item.nama,
                    keterangan: item.keterangan,
                    harga: item.harga,
                    jumlah: item.jumlah,
                    invoicesId: invoice.id,
                };
            });

            const product = await tx.invoice_products.createMany({
                data: productDB
            })

            const customer = await tx.invoice_customers.createMany({
                data: {
                    nama: customerValid.nama,
                    alamat: customerValid.alamat,
                    kota: customerValid.kota,
                    tlp: customerValid.tlp,
                    invoicesId: invoice.id,
                }
            })
            return { product, customer, invoice }
        })

        revalidatePath('/')
        return {
            message: "Success Create Data Invoice",
            status: true
        }

    } catch (e: unknown) {
        if (e instanceof z.ZodError) {
            return {
                message: "Error Validation at create",
                error: e.flatten().formErrors,
                status: false
            }
        }
        console.log(e)
        return {
            message: "Fail Create Data Invoice",
            status: false
        }
    }
}

export async function invoiceDeleteAction(invoiceId: number) {
    await prisma.$transaction(async (tx) => {

        const data = await tx.invoices.findUnique({
            select: { id: true },
            where: { id: invoiceId }
        })

        if (!data) {
            throw new Error('The Data is Not Found')
        }

        await tx.invoice_products.deleteMany({
            where: { invoicesId: data.id }
        })

        await tx.invoice_customers.deleteMany({
            where: { invoicesId: data.id }
        })

        await tx.invoices.delete({
            where: { id: data.id }
        })
    })
    revalidatePath('/')
    return {
        message: `Success Delete Invoice Id ${ invoiceId }`,
        status: true,
    }
}

export async function invoiceUpdateAction(invoice: InvoiceSchemaType, invoiceId: number) {
    try {

        const { customer: customerValid, products: productsValid, ...data } = invoiceBodySchemaCreate.parse(invoice)

        await prisma.$transaction(async (tx) => {
            const foundInvoice = await tx.invoices.findUnique({
                where: { id: invoiceId }
            })
            if (!foundInvoice) {
                throw new Error(`No invoice with id ${ invoiceId }`)
            }
            const invoice = await tx.invoices.update({
                where: { id: foundInvoice.id },
                data: {
                    tanggal_invoice: data.tanggal,
                    ongkir: data.ongkir,
                    discount: data.discount,
                    total: data.total,
                    uang_muka: data.uang_muka,
                    notes: data.notes,
                    status: data.status,
                }
            })

            await tx.invoice_customers.deleteMany({ where: { invoicesId: invoice.id } })
            await tx.invoice_products.deleteMany({ where: { invoicesId: invoice.id } })

            const customer = await tx.invoice_customers.create({
                data: {
                    nama: customerValid.nama,
                    alamat: customerValid.alamat,
                    kota: customerValid.kota,
                    tlp: customerValid.tlp,
                    invoicesId: invoice.id,
                }
            })

            const product = productsValid.map((item) => {
                return {
                    nama: item.nama,
                    keterangan: item.keterangan,
                    harga: item.harga,
                    jumlah: item.jumlah,
                    invoicesId: invoice.id,
                };
            });

            await tx.invoice_products.createMany({ data: product })

            return { product, customer, invoice }
        })
        revalidatePath('/')
        return {
            message: "Success Update Data Invoice",
            status: true
        }
    } catch (e: unknown) {
        if (e instanceof z.ZodError) {
            return {
                message: "Error Validation at create",
                error: e.flatten().formErrors,
                status: false
            }
        }
        console.log(e)
        return {
            message: "Fail Create Data Invoice",
            status: false
        }
    }
}
