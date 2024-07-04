import React from 'react';

const IngredientList = ({ ingredients, onSelectIngredient }) => {
  return (
    <div className="space-y-4">
      {ingredients.map(ingredient => (
        <div key={ingredient.id} className="border-b last:border-b-0 p-4 hover:bg-gray-100 cursor-pointer" onClick={() => onSelectIngredient(ingredient.id, ingredient.name)}>
          <h3 className="text-lg font-semibold">{ingredient.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default IngredientList;
