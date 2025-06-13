import React from "react";
import { TProduct } from "./products-handler";
import Product from "./product";

export default function Products({ products }: { products: TProduct[] }) {
  return (
    <div className="grid grid-cols-4 gap-4 pb-12 pt-8 px-8">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
