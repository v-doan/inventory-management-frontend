import React, { useEffect, useState } from 'react';

const IngredientDetails = ({ ingredientId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (ingredientId) {
      setLoading(true);
      setError(null);
      fetch(`https://inventory-management-backend-f36ec1d11345.herokuapp.com/api/ingredients/${ingredientId}/products`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch ingredient details');
          }
          return response.json();
        })
        .then(data => {
          console.log("Fetched ingredient details:", data);
          setProducts(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching ingredient details:', error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [ingredientId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!products.length) {
    return <div>No products found for this ingredient.</div>;
  }

  return (
    <div className="p-4">
      <div className="mt-4 p-4 border rounded-lg">
        {products.map((product, index) => (
          <div key={product.id} className={`flex justify-between items-center ${index < products.length - 1 ? 'border-b' : ''} py-2`}>
            <h2 className="text-lg">{product.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientDetails;
