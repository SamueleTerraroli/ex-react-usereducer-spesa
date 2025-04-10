import { useState } from 'react';

function App() {
  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [addedProducts, setAddedProducts] = useState([]);

  const updateProductQuantity = (productName, newQuantity) => {
    if (newQuantity === "" || isNaN(newQuantity)) {
      setAddedProducts(prevProducts =>
        prevProducts.map(prevProduct =>
          prevProduct.name === productName
            ? { ...prevProduct, quantity: "" }
            : prevProduct
        )
      );
      return;
    }

    if (newQuantity < 1) {
      return;
    }

    setAddedProducts(prevProducts =>
      prevProducts.map(prevProduct =>
        prevProduct.name === productName
          ? { ...prevProduct, quantity: newQuantity }
          : prevProduct
      )
    );
  };

  const addToCart = (product) => {
    const isProductInCart = addedProducts.find(item => item.name === product.name);
    if (isProductInCart) {
      updateProductQuantity(isProductInCart.name, isProductInCart.quantity + 1);
      return;
    }
    const productToAdd = {
      ...product,
      quantity: 1
    };
    setAddedProducts(prevProducts => [...prevProducts, productToAdd]);
  };

  const removeFromCart = (product) => {
    setAddedProducts(prevProducts => prevProducts.filter(item => item.name !== product.name));
  };

  const totalPrice = addedProducts.reduce((acc, product) => {
    return acc + (product.price * (parseInt(product.quantity) || 0));
  }, 0);

  return (
    <>
      <h1>Lista prodotti</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - {product.price.toFixed(2)}€
            <button onClick={() => addToCart(product)}>Aggiungi al carrello</button>
          </li>
        ))}
      </ul>
      {addedProducts.length > 0 && (
        <>
          <h1>Carrello</h1>
          <ul>
            {addedProducts.map((product, index) => (
              <li key={index}>
                <p>
                  <input
                    type="number"
                    value={product.quantity === "" ? "" : product.quantity}
                    onChange={(e) => updateProductQuantity(product.name, parseInt(e.target.value) || "")}
                    min="1"
                  />
                  <span>x {product.name} ({product.price.toFixed(2)}€)</span>
                </p>
                <button onClick={() => removeFromCart(product)}>Rimuovi dal carrello</button>
              </li>
            ))}
          </ul>
          <h2>Totale: {totalPrice.toFixed(2)}€</h2>
        </>
      )}
    </>
  );
}

export default App;
