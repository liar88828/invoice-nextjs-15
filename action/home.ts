'use server'

import prisma from "@/lib/prisma";
import { toDate } from "@/utils/date";
import { ResponseChartType } from "@/interface/chart";

export const invoiceChart = async () => {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 30); // Start from today - 30 days

    // Fetch data grouped by day
    return prisma.invoices.groupBy({

        by: [ 'tanggal_invoice' ],
        where: {
            status: "Selesai",
            tanggal_invoice: {
                gte: startDate, // Only invoices from the last 30 days
            },
        },
        _sum: {
            total: true,
        },
        orderBy: {
            tanggal_invoice: 'asc',
        },
    }).then(data => data.map((item): ResponseChartType => ({
            title: toDate(item.tanggal_invoice),
            count: Number(item._sum.total),
        }))
    )
}

export const productChart = async () => {
    return prisma.invoice_products.groupBy({
        by: [ 'nama' ],
        _sum: { jumlah: true }, // Sum 'jumlah' per product name
    }).then((data) => {
        return data.map((item): ResponseChartType => ({
            title: item.nama,
            count: item._sum.jumlah || 0, // Ensure count is always a number
        }));
    });
}

export const customerChart = async () => {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1); // January 1st

    return prisma.invoice_customers.groupBy({
        by: [ 'kota' ],
        where: {
            Invoices: {
                createdAt: {
                    gte: startOfYear, // Only data from this year
                },
            }
        },
        _count: { kota: true }, // Count users per city
    }).then((data) => {
        // console.log(data)
        return data.map(item => ({
                title: item.kota,
                count: item._count.kota,
            })
        )
    })
}

