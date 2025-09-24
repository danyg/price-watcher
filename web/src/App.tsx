import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  url: string;
  selectorWithPrice: string;
  targetPrice: number;
}

interface PriceHistory {
  id: number;
  price: number;
  checkedAt: string;
}

const API = "http://localhost:3001/api";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [history, setHistory] = useState<PriceHistory[]>([]);

  useEffect(() => {
    fetch(`${API}/products`).then((res) => res.json()).then(setProducts);
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      fetch(`${API}/history/${selectedProduct.id}`)
        .then((res) => res.json())
        .then(setHistory);
    } else {
      setHistory([]);
    }
  }, [selectedProduct]);

  return (
    <div style={{ padding: 32 }}>
      <h1>Watched Products</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <button onClick={() => setSelectedProduct(p)}>
              {p.name}
            </button>
          </li>
        ))}
      </ul>
      {selectedProduct && (
        <div style={{ marginTop: 32 }}>
          <h2>Price History for {selectedProduct.name}</h2>
          <table border={1} cellPadding={8}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.id}>
                  <td>{new Date(h.checkedAt).toLocaleString()}</td>
                  <td>{h.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
