"use client";

import { TProduct } from "./products-handler";
import Link from "next/link";
import { useEffect } from "react";

export default function Product({ product }: { product: TProduct }) {
  useEffect(() => {
    if (!product) return;

    if (typeof window !== "undefined") {
      window.dataLayer?.push(product);
    }
  }, [product]);
  console.log("product", product);
  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="border rounded-lg p-4 h-full flex flex-col">
        <div className="h-48 relative mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain"
          />
        </div>
        <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
        <p className="text-gray-700 mb-2">${product.price}</p>
        <div className="mt-auto">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
      </div>
    </Link>
  );
}
