import React, { useEffect, useState, useCallback } from 'react';
import BASE_URL from '../config';

const ProductDetails = ({ productId, productName, onClose }) => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newIngredient, setNewIngredient] = useState('');

  useEffect(() => {
    if (productId) {
      setLoading(true);
      setError(null);
      fetch(`${BASE_URL}/products/${productId}/ingredients`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch product details');
          }
          return response.json();
        })
        .then(data => {
          console.log("Fetched product details:", data);
          setIngredients(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching product details:', error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [productId]);

  const handleAddIngredient = useCallback(() => {
    if (!newIngredient.trim()) return;

    fetch(`${BASE_URL}/products/${productId}/ingredients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newIngredient }),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Added ingredient:", data);
        setIngredients(prevIngredients => [...prevIngredients, data]);
        setNewIngredient('');
      })
      .catch(error => {
        console.error('Error adding ingredient:', error);
      });
  }, [newIngredient, productId]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleAddIngredient();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleAddIngredient]);

  const handleDeleteIngredient = (ingredientId) => {
    fetch(`${BASE_URL}/products/${productId}/ingredients/${ingredientId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete ingredient');
        }
        setIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== ingredientId));
      })
      .catch(error => {
        console.error('Error deleting ingredient:', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center">{productName}</h1>
      <div className="mt-4 p-4 border rounded-lg">
        {ingredients.map((ingredient, index) => (
          <div key={ingredient.id} className={`flex justify-between items-center ${index < ingredients.length - 1 ? 'border-b' : ''} py-2`}>
            <h2 className="text-lg">{ingredient.name}</h2>
            <button
              className="text-red-500 hover:text-red-700 text-2xl"
              onClick={() => handleDeleteIngredient(ingredient.id)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <input
          type="text"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          className="border p-2 rounded-lg"
          placeholder="New Ingredient"
        />
        <button
          className="ml-2 bg-green-500 text-white px-4 py-2 rounded-lg"
          onClick={handleAddIngredient}
        >
          Add Ingredient
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
