import { useState } from 'react'

function App() {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [addedProducts, setAddedProducts] = useState([]);
  console.log(addedProducts);

  const addToCart = (product) => {
    const isProductInCart = addedProducts.some(item => item.name === product.name);
    if (isProductInCart) {
      return;
    }
    const productToAdd = {
      ...product,
      quantity: 1
    }
    setAddedProducts(prevProducts => [...prevProducts, productToAdd]);
  }

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
      {addedProducts.length > 0 && (<>
        <h1>Carrello</h1>
        <ul>
          {addedProducts.map((product, index) => (
            <li key={index}>
              {product.name} - {product.price.toFixed(2)}€ x {product.quantity}
            </li>
          ))}
        </ul>
      </>)}
    </>
  )
}

export default App
