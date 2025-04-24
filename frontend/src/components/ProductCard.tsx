import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onBuyNow: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onBuyNow }) => {
  return (
    <div className="p-4 md:w-1/3">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={product.image}
          alt="product"
        />
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            CATEGORY
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {product.category}
          </h1>
          <p className="leading-relaxed mb-3">
            {product.description}
          </p>
          <div className="mb-3">
            <button
              onClick={() => onBuyNow(product)}
              className="px-4 py-2 bg-black text-white rounded-md shadow"
            >
              Buy ${product.price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 