import { create } from "zustand";
import { toDateForm } from "@/utils/date";
import { Customers, Products } from "@prisma/client";
import { InvoiceResponse, InvoiceResponseValid } from "@/schema/invoice";

interface InvoiceParam {
    limit: number;
    page: number;
    name: string;
    status: string;
    search: string;
    startDate: string;
    endDate: string;
}

export interface ProductField {
    id: number
    nama: string;
    harga: number;
    jumlah: number;
    keterangan: string;
}

interface CustomerField {
    id: number
    nama: string;
    kota: string;
    tlp: string;
    alamat: string;
}

interface InvoiceField {
    tanggal: string
    ongkir: number,
    discount: number,
    total: number,
    uang_muka: number,
    notes: string,
    status: string,
}

interface InvoiceStore {
    invoiceField: InvoiceField
    products: ProductField[];
    customer: CustomerField;
    setCustomer: (customer: Customers) => void;
    setCustomerPartial: (customer: Partial<Customers>) => void;
    addField: (product?: Products) => void;
    increment: (id: number) => void,
    decrement: (id: number) => void
    removeField: (id: number) => void;
    updateField: (id: number, value: Partial<ProductField>) => void;
    params: InvoiceParam;
    setParams: (param: Partial<InvoiceParam>) => void;
    setInvoiceField: (param: Partial<InvoiceField>) => void;
    combineProps: (props: Required<InvoiceResponseValid>) => void;
    calculate: {
        totalProducts: number;
        totalProductOngkir: number
        totalAfterDiscount: number
    }
    setCalculated: () => void
    resetForm:()=>void;
}
const defaultForm={
    invoiceField: {
        tanggal: toDateForm(new Date()),
        ongkir: 0,
        discount: 0,
        total: 0,
        uang_muka: 0,
        notes: '-',
        status: 'Pending',
    },
    products: [ {
        id: Date.now(),
        nama: "",
        harga: 0,
        jumlah: 1,
        keterangan: "",
    } ],
    customer: {
        id: Date.now(),
        kota: '',
        tlp: '',
        alamat: '',
        nama: ''
    },
}
export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  ...defaultForm,
    calculate: {
        totalProducts: 0,
        totalProductOngkir: 0,
        totalAfterDiscount: 0,
    },

    params: {
        name: "",
        status: "",
        startDate: toDateForm(new Date(), -1),
        endDate: toDateForm(new Date(), +1),
        search: "",
        limit: 10,
        page: 1
    },
    resetForm:()=>{
        set({
            products: defaultForm.products,
            customer: defaultForm.customer,
            invoiceField: defaultForm.invoiceField
        })
        get().setCalculated()

    },
    combineProps: ({ Invoice_customers, Invoice_products, ...invoiceProps }) => {
        set({
            products: Invoice_products,
            customer: Invoice_customers,
            invoiceField: {
                ...invoiceProps,
                tanggal: toDateForm(invoiceProps.tanggal_invoice)
            }
        })
        get().setCalculated()
    },
    setCustomer: (customer) => {
        set(({ customer: customer }));
    },
    setCustomerPartial: (customer) => {
        set((state) => ({
            customer: {
                ...state.customer,
                ...customer
            }
        }));
    },
    setCalculated: () => {
        set((state) => {
            const totalProducts = state.products.reduce((a, b) => a + b.jumlah * b.harga, 0);
            const totalProductOngkir = totalProducts + state.invoiceField.ongkir - state.invoiceField.uang_muka;
            const discountAmount = (state.invoiceField.discount / 100) * totalProductOngkir;
            const totalAfterDiscount = totalProductOngkir - discountAmount
            return {
                invoiceField: {
                    ...state.invoiceField,
                    total: totalAfterDiscount,
                },
                calculate: {
                    totalProducts,
                    totalProductOngkir,
                    totalAfterDiscount,
                }
            }
        })
    },
    setInvoiceField: (form: Partial<InvoiceField>) => {
        set((state) => ({
            invoiceField: {
                ...state.invoiceField,
                ...form
            }
        }))
        get().setCalculated()
    },
    setParams: (param: Partial<InvoiceParam>) => {
        set((state) => ({
            params: {
                ...state.params,
                ...param
            }
        }))
    },
    increment: (id) => {
        set((state) => {
            const products = state.products.map(item => {
                return item.id === id
                    ? { ...item, jumlah: item.jumlah + 1 }
                    : item
            })
            return { products }
        })
        get().setCalculated()

    },
    decrement: (id) => {
        set((state) => {
            const products = state.products.map(item => {
                return item.id === id && item.jumlah > 1
                    ? { ...item, jumlah: item.jumlah - 1 }
                    : item
            })
            return { products }
        })
        get().setCalculated()

    },
    addField: (product) => {
        if (product) {
            set((state) => ({
                products: [
                    ...state.products,
                    {
                        id: product.id,
                        nama: product.nama,
                        harga: product.harga,
                        jumlah: 1,
                        keterangan: product.keterangan,

                    },
                ],
            }))
        } else {
            set((state) => ({
                products: [
                    ...state.products,
                {
                    id: Date.now(),
                    nama: "",
                    harga: 0,
                    jumlah: 1,
                    keterangan: "",

                },
            ],
            }))
        }
    },

    removeField: (id) => {
        set((state) => ({
            products: state.products.filter((field) => field.id !== id),
        }))
        get().setCalculated()

    },

    updateField: (id, value) => {
        set((state) => ({
            products: state.products.map((field) =>
                field.id === id
                    ? { ...field, ...value }
                    : field
            ),
        }))
        get().setCalculated()

    },
}));
