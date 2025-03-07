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

export default async function ProductsHandler() {
  const data = await fetch(api);
  const products: TProduct[] = await data.json();
  // console.log("products", products);

  return (
    <>
      <Products products={products} />
    </>
  );
}
