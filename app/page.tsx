import ProductsFetcher from "./components/products-fetcher";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 gap-16">
      <main>
        <h1 className="text-2xl font-bold">Webshop</h1>
        <ProductsFetcher />
      </main>
    </div>
  );
}
