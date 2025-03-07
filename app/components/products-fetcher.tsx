import React from "react";
import Products from "./products";

const api = "https://fakestoreapi.com/products";

export default async function ProductsFetcher() {
  const data = await fetch(api);
  const products = await data.json();
  console.log("products", products);

  return (
    <>
      <Products products={products} />
    </>
  );
}
