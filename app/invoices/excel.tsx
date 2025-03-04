import * as XLSX from 'xlsx';
import { InvoiceResponse } from "@/schema/invoice";
import { toDate } from "@/utils/date";

interface ExportToExcelProps {
    invoiceData: InvoiceResponse[];
}

const ExportToExcel: React.FC<ExportToExcelProps> = ({ invoiceData }) => {
    const exportToExcel = () => {
        const invoiceInfo = invoiceData.map(invoice => ({
            id: invoice.id,
            tanggal_invoice: invoice.tanggal_invoice,
            ongkir: invoice.ongkir,
            discount: invoice.discount,
            total: invoice.total,
            notes: invoice.notes,
            status: invoice.status,
            uang_muka: invoice.uang_muka,
            createdAt: invoice.createdAt,
            customer_nama: invoice.Invoice_customers?.nama,
            customer_alamat: invoice.Invoice_customers?.alamat,
            customer_kota: invoice.Invoice_customers?.kota,
            customer_tlp: invoice.Invoice_customers?.tlp,
            product_nama: invoice.Invoice_products?.map(item => `${ item.nama } x ${ item.jumlah } = ${ item.jumlah * item.harga }`).join(',\n') || "",
            product_total: invoice.Invoice_products?.reduce((sum, item) => sum + (item.jumlah * item.harga), 0) || 0
        }));

        const products = invoiceData.flatMap(({ Invoice_products }) =>
            Invoice_products.map(productItem => ({
                product_id: productItem.id,
                product_nama: productItem.nama,
                product_keterangan: productItem.keterangan,
                product_harga: productItem.harga,
                product_jumlah: productItem.jumlah,
                product_total: productItem.harga * productItem.jumlah,
                product_local_id: productItem.id,
                product_invoice_id: productItem.invoicesId,
            }))
        );

        const wsInvoice = XLSX.utils.json_to_sheet(invoiceInfo);
        const wsProducts = XLSX.utils.json_to_sheet(products);

        wsInvoice['!cols'] = [
            { wpx: 50 }, { wpx: 100 }, { wpx: 50 }, { wpx: 50 }, { wpx: 50 }, { wpx: 150 },
            { wpx: 70 }, { wpx: 50 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 },
            { wpx: 200 }, { wpx: 200, }, { wpx: 200 },
        ];

        wsProducts['!cols'] = [
            { wpx: 50 }, { wpx: 200 }, { wpx: 200 }, { wpx: 200 }, { wpx: 200 }, { wpx: 200 }, { wpx: 200 }, { wpx: 200 },
        ];
        // Set dynamic row height, skipping the title row (row 1)

        // wsInvoice['!rows'] = [
        //     { hpx: 15 }, ...invoiceInfo.map(info => ({
        //         hpx: 20 + (info.product_nama.split('\n').length * 15) // Base height 20px + 15px per product line
        //     })) ];

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, wsInvoice, 'Invoice Info');
        XLSX.utils.book_append_sheet(wb, wsProducts, 'Products');
        XLSX.writeFile(wb, `Invoice_Data_${ toDate(new Date()) }.xlsx`);
    };

    return (
        <div>
            <button onClick={ exportToExcel } className="btn btn-success">
                Export to Excel
            </button>
        </div>
    );
};

export default ExportToExcel;
