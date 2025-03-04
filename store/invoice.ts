import { create } from "zustand";

interface InvoiceField {
    id: number;
    name: string;
    value: string;
}

interface InvoiceStore {
    fields: InvoiceField[];
    addField: () => void;
    removeField: (id: number) => void;
    updateField: (id: number, value: string) => void;
}

export const useInvoiceStore = create<InvoiceStore>((set) => ({
    fields: [ { id: 1, name: "field1", value: "" } ], // Field default
    addField: () =>
        set((state) => ({
            fields: [
                ...state.fields,
                {
                    id: Date.now(),
                    name: `field${ state.fields.length + 1 }`,
                    value: ""
                },
            ],
        })),

    removeField: (id) =>
        set((state) => ({
            fields: state.fields.filter((field) => field.id !== id),
        })),

    updateField: (id, value) =>
        set((state) => ({
            fields: state.fields.map((field) =>
                field.id === id ? { ...field, value } : field
            ),
        })),
}));
