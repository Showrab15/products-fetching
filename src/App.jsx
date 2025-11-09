import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(0);
  const [loader, setLoader] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ NEW search state

  // ✅ Load cart count from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cartCount");
    if (savedCart) {
      setCart(parseInt(savedCart, 10));
    }
  }, []);

  // ✅ Fetch products
  useEffect(() => {
    setLoader(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoader(false);
      });
  }, []);

  // ✅ Handle add to cart
  const handleAddToCart = () => {
    setCart((prev) => {
      const updatedCart = prev + 1;
      localStorage.setItem("cartCount", updatedCart); // save to localStorage
      return updatedCart;
    });
  };

  // ✅ Filter products by searchTerm
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Fake APIS Data</h1>
      <h4>Total Products: {products.length}</h4>
      <h5>My Cart Items: {cart}</h5>

      {/* ✅ Search Input */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "8px", margin: "10px 0", width: "200px" }}
      />

      {loader ? (
        <p>Loading........</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "10px",
          }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                style={{ border: "1px solid #ccc", padding: "10px" }}
              >
                <h4>{product.name}</h4>
                <p>{product.email}</p>
                <button onClick={handleAddToCart}>Add to cart</button>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}
