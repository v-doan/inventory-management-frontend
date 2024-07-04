import React from 'react';

const ProductList = ({ products, onSelectProduct }) => {
  return (
    <div className="space-y-4">
      {products.map(product => (
        <div key={product.id} className="border-b last:border-b-0 p-4 hover:bg-gray-100 cursor-pointer" onClick={() => onSelectProduct(product.id, product.name)}>
          <h3 className="text-lg font-semibold">{product.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
