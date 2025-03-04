import type { Invoice_customers, Invoice_products, Invoices } from '@prisma/client'
import { z } from "zod"

export const invoiceIdSchema = z.number()

// type ExampleType = z.ZodType<Omit<Invoices, 'id'> & {
//     productId: {
//         id: number,
//         qty: number
//     }[],
//     customerId: number,
//     id?: number,
// }>

export const invoiceBodySchemaCreate = z.object({
    id: z.number().optional(),
    tanggal: z.coerce.date(),//z.string().datetime(),
    ongkir: z.number(),
    discount: z.number(),
    total: z.number(),
    notes: z.string().min(1),
    status: z.string().min(1),
    uang_muka: z.number(),
    customer: z.object({
        id: z.number(),
        kota: z.string(),
        tlp: z.string(),
        alamat: z.string(),
        nama: z.string()
    }),
    products: z.array(z.object({
        id: z.number(),
        harga: z.number(),
        jumlah: z.number(),
        keterangan: z.string(),
        nama: z.string(),
    })),
})

export type InvoiceSchemaType = z.infer<typeof invoiceBodySchemaCreate>

export type InvoiceResponse = Invoices & {
    Invoice_customers: Invoice_customers | null,
    Invoice_products: Invoice_products[]
}

export type InvoiceResponseValid = Invoices & {
    Invoice_customers: Invoice_customers,
    Invoice_products: Invoice_products[]
}