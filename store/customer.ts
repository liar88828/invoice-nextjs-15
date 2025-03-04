import { create } from "zustand";

interface CustomerParam {
    limit: number;
    page: number;
    name: string;
    kota: string;
    search: string;
}

export type CustomerForms = {
    name: string;
    kota: string;
    tlp: string;
    alamat: string;
};

interface CustomerStore {
    forms: CustomerForms
    setForms: (param: Partial<CustomerForms>) => void;
    resetForms: () => void;
    params: CustomerParam;
    setParams: (param: Partial<CustomerParam>) => void;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
    forms: {
        kota: '',
        tlp: '',
        alamat: '',
        name: ''
    },

    params: {
        name: "",
        kota: "",
        search: "",
        limit: 10,
        page: 1
    },
    setParams: (param: Partial<CustomerParam>) => {
        set((state) => ({
            params: {
                ...state.params,
                ...param
            }
        }))
    },
    setForms: (form: Partial<CustomerForms>) => {
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
                kota: '',
                tlp: '',
                alamat: '',
                name: ''
            }
        }))
    }
}));
