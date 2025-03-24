import React from "react";
import Products from "./products";

const api = "https://fakestoreapi.com/products";

export type TProduct = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
  rating: {
    rate: number;
    count: number;
  };
};

const fetchProducts = async () => {
  try {
    const response = await fetch(api);
    if (!response.ok) throw new Error("failed to fetch products");
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export default async function ProductsHandler() {
  const products: TProduct[] = await fetchProducts();

  const newProducts = () => {
    const newP = products.map((product) => {
      const item = {
        ...product,
        popular: product.rating.rate > 4.5,
      };
      return item;
    });

    return newP;
  };

  const finalProducts = newProducts();

  return (
    <>
      <Products products={finalProducts} />
    </>
  );
}
