'use client'
import Link from "next/link";
import { usePrint } from "@/utils/print";
import React, { ReactNode } from "react";
import { Printer } from "lucide-react";
import { InvoiceResponseValid } from "@/schema/invoice";
import { toDate } from "@/utils/date";
import { toPrice } from "@/utils/price";
import { toCalculate } from "@/utils/calculate";

export function PrintComponent({ children, href }: { href?: string, children: ReactNode }) {
    const { isPrinting, handlePrint, contentRef } = usePrint()
    return (
        <div ref={ contentRef }>
            <div className=" print:hidden gap-2 mb-2 flex  items-center">
                { href && <Link href={ href } className={ 'btn btn-outline' }>Back</Link> }
                <button
                    onClick={ handlePrint }
                    disabled={ isPrinting }
                    className={ 'btn btn-info ' }
                >
                    { isPrinting ? 'Printing...' : <>Print PDF <Printer/></> }
                </button>
            </div>
            { children }
        </div>
    );
}

const Invoice = ({ invoice: { Invoice_products: products, Invoice_customers: customer, ...invoices }, }: {
    invoice: InvoiceResponseValid
}) => {
    const calculateTotal = () => {
        const subtotal = toCalculate(products)
        const discountAmount = subtotal * (invoices.discount / 100)
        return subtotal + invoices.ongkir - discountAmount - invoices.uang_muka
    }
    return (
        <div
            data-theme={'light'}
            className="max-w-4xl mx-auto p-8 bg-white shadow-lg print:h-screen print:w-screen">
            {/* Invoice Header */ }
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-2xl font-bold mb-2">INVOICE</h1>
                    <p className="text-gray-600">Invoice #{ invoices.id }</p>
                    <p className="text-gray-600">{ toDate(invoices.tanggal_invoice) }</p>
                </div>
                <div className="text-right">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        { invoices.status }
                    </div>
                </div>
            </div>

            {/* Customer Details */ }
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-3">Customer Details</h2>
                <div className="bg-gray-50 p-4 rounded">
                    <p className="font-medium">{ customer.nama }</p>
                    <p>{ customer.alamat }</p>
                    <p>{ customer.kota }</p>
                    <p>Tel: { customer.tlp }</p>
                </div>
            </div>

            {/* Products Table */ }
            <div className="mb-8">
                <table className="w-full">
                    <thead>
                    <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-2">Product</th>
                        <th className="text-left py-2">Description</th>
                        <th className="text-right py-2">Price</th>
                        <th className="text-right py-2">Quantity</th>
                        <th className="text-right py-2">Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    { products.map((product) => (
                        <tr key={ product.id } className="border-b">
                            <td className="py-2">{ product.nama }</td>
                            <td className="py-2">{ product.keterangan }</td>
                            <td className="text-right py-2">{ toPrice(product.harga) }</td>
                            <td className="text-right py-2">{ product.jumlah }</td>
                            <td className="text-right py-2">{ toPrice(product.harga * product.jumlah) }</td>
                        </tr>
                    )) }
                    </tbody>
                </table>
            </div>

            {/* Summary */ }
            <div className="w-1/2 ml-auto">
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>{ toPrice(toCalculate(products)) }</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>{ toPrice(invoices.ongkir) }</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Discount:</span>
                        <span>{ invoices.discount }%</span>
                    </div>
                    { invoices.uang_muka > 0 && (
                        <div className="flex justify-between">
                            <span>Down Payment:</span>
                            <span>{ toPrice(invoices.uang_muka) }</span>
                        </div>
                    ) }
                    <div className="flex justify-between font-bold pt-2 border-t">
                        <span>Total:</span>
                        <span>{ toPrice(calculateTotal()) }</span>
                    </div>
                </div>
            </div>

            {/* Notes */ }
            <div className="mt-8 pt-4 border-t">
                <h3 className="font-semibold mb-2">Notes:</h3>
                <p className="text-gray-600">{ invoices.notes }</p>
            </div>
        </div>
    );
};

export default Invoice;
