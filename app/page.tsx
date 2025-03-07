import ProductsHandler from "@/components/products-handler";

export default function Home() {
  return (
    <main className="text-center pt-4">
      <h1 className="text-3xl font-bold">Webshop</h1>
      <ProductsHandler />
    </main>
  );
}
