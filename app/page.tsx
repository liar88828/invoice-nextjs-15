import { customerChart, invoiceChart, productChart } from "@/action/home";
import { ProductChart } from "@/app/components/chart/ProductChart";
import { CustomerChart } from "@/app/components/chart/CustomerChart";
import { InvoiceChart } from "@/app/components/chart/InvoiceChart";

export default async function Home() {
    const invoice = await invoiceChart()
    const product = await productChart()
    const customer = await customerChart()
    console.log("product Chart", product)
  return (
      <div className="grid grid-cols-1 gap-5">
          <div className="flex gap-5 justify-between">
              <ProductChart item={ product }/>
              <CustomerChart item={ customer }/>
          </div>
          <InvoiceChart item={ invoice }/>
      </div>
  );
}
