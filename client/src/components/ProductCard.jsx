import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        className="w-full h-48 object-cover"
        src={product.image || "https://via.placeholder.com/300x200"}
        alt={product.name}
      />
      <div className="p-4">
        {/* Code */}
        <p className="text-xs text-gray-500 mb-1">Code: {product.code}</p>

        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-2">
          {product.description}
        </p>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>

        {/* Customize link if applicable */}
        {product.isCustomizable && (
          <div className="mt-2">
            <a
              href={`/customize/${product.code}`}
              className="text-blue-500 text-xs hover:underline"
            >
              Customize
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
