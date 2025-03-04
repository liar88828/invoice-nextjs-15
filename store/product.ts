import { create } from "zustand";

interface ProductParam {
    limit: number;
    page: number;
    name: string;
    price: string;
    search: string;
}

export type ProductForms = {
    name: string;
    harga: number;
    jumlah: number;
    keterangan: string;
};

interface ProductStore {
    forms: ProductForms
    setForms: (param: Partial<ProductForms>) => void;
    resetForms: () => void;
    params: ProductParam;
    setParams: (param: Partial<ProductParam>) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
    forms: {
        harga: 0,
        jumlah: 0,
        keterangan: '',
        name: ""
    },

    params: {
        name: "",
        price: "",
        search: "",
        limit: 10,
        page: 1
    },
    setParams: (param: Partial<ProductParam>) => {
        set((state) => ({
            params: {
                ...state.params,
                ...param
            }
        }))
    },
    setForms: (form: Partial<ProductForms>) => {
        set((state) => ({
            forms: {
                ...state.forms,
                ...form
            }
        }))
    },
    resetForms: () => {
        set(({
            forms: {
                harga: 0,
                jumlah: 0,
                keterangan: '',
                name: ""
            }
        }))
    }
}));
