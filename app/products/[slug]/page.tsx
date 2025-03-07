import React from "react";

const ProductDetailPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const productId = parseInt(slug);

  const data = await fetch(`https://fakestoreapi.com/products/${productId}`);
  const product = await data.json();

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <div className="h-96 relative">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
            <p className="text-xl font-semibold mb-4">${product.price}</p>
            <div className="mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
                {product.category}
              </span>
            </div>
            <div className="mb-4 flex items-center">
              <span className="mr-2">Rating: {product.rating.rate}/5</span>
              <span>({product.rating.count} reviews)</span>
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <button className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
