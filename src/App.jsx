import { useReducer } from 'react';

function cartReducer(addedProducts, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      // Logica per aggiungere un prodotto
      const isProductInCart = addedProducts.find(item => item.name === action.payload.name);
      if (isProductInCart) {
        action.payload.quantity = isProductInCart.quantity + 1;
      } else {
        return [...addedProducts, { ...action.payload, quantity: 1 }];
      }
    case 'UPDATE_QUANTITY':
      // Logica per aggiornare la quantità
      return addedProducts.map(product => {
        if (product.name === action.payload.name) {
          return { ...product, quantity: action.payload.quantity };
        }
        return product;
      });
    case 'REMOVE_ITEM':
      // Logica per rimuovere un prodotto
      return addedProducts.filter(product => product.name !== action.payload);
    default:
      return state;
  }
}

function App() {
  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [addedProducts, dispatchCart] = useReducer(cartReducer, []);


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
            <button onClick={() => dispatchCart({ type: 'ADD_ITEM', payload: product })}>Aggiungi al carrello</button>
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
                    onChange={(e) => dispatchCart({ type: 'UPDATE_QUANTITY', payload: { name: product.name, quantity: e.target.value } })
                    }
                    min="1"
                  />
                  <span>x {product.name} ({product.price.toFixed(2)}€)</span>
                </p>
                <button onClick={() => dispatchCart({ type: 'REMOVE_ITEM', payload: product.name })}>Rimuovi dal carrello</button>
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
