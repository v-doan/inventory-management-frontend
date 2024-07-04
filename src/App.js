import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import ProductList from './components/ProductList';
import IngredientList from './components/IngredientList';
import ProductDetails from './components/ProductDetails';
import IngredientDetails from './components/IngredientDetails';
import Modal from './components/Modal';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [products, setProducts] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));

    fetch('http://localhost:8080/api/ingredients')
      .then(response => response.json())
      .then(data => setIngredients(data))
      .catch(error => console.error('Error fetching ingredients:', error));
  }, []);

  const handleSelectProduct = (productId, productName) => {
    setModalContent(
      <ProductDetails
        key={productId}
        productId={productId}
        onClose={() => setShowModal(false)}
      />
    );
    setModalTitle(`${productName}`);
    setShowModal(true);
  };

  const handleSelectIngredient = (ingredientId, ingredientName) => {
    setModalContent(<IngredientDetails ingredientId={ingredientId} />);
    setModalTitle(`${ingredientName}`);
    setShowModal(true);
  };

  return (
    <div className="App">
      <Helmet>
        <title>Inventory Management</title>
      </Helmet>
      <Header />
      <div className="container mx-auto my-4 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Products</h2>
            <div className="rounded-lg border p-4">
              <ProductList products={products} onSelectProduct={handleSelectProduct} />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Ingredients</h2>
            <div className="rounded-lg border p-4">
              <IngredientList ingredients={ingredients} onSelectIngredient={handleSelectIngredient} />
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} title={modalTitle}>
          {modalContent}
        </Modal>
      )}
    </div>
  );
}

export default App;
