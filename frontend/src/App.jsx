
import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BrandPage from "./pages/brands/BrandPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails";
import DenimVoice from "./pages/DenimVoice";
import OrderConfirmation from "./pages/OrderConfirmation";
import Search from "./pages/Search";

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [lastOrder, setLastOrder] = useState(null);

    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);

      useEffect(() => {
      fetch("/products/")
      .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
      })
      .then((data) => {
      setProducts(data);
      })
      .catch((error) => {
      console.error("Products API error:", error);
      })
      .finally(() => {
      setProductsLoading(false);
      });
     }, []);

    const handleAddToCart = (product) => {
    setCartItems((previousItems) => {
    const existingItem = previousItems.find(
        (item) =>
          item.id === product.id &&
          item.selectedSize === product.selectedSize
      );

      if (existingItem) {
        return previousItems.map((item) =>
          item.id === product.id &&
          item.selectedSize === product.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousItems, { ...product, quantity: 1 }];
    });

    alert("Product added to cart!");
  };

  const handleUpdateQuantity = (id, size, quantity) => {
    if (quantity <= -1) {
      setCartItems((items) =>
        items.filter(
          (item) => !(item.id === id && item.selectedSize === size)
        )
      );
      return;
    }

    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (id, size) => {
    setCartItems((items) =>
      items.filter(
        (item) => !(item.id === id && item.selectedSize === size)
      )
    );
  };

  const handlePlaceOrder = (order) => {
    setLastOrder(order);
    setCartItems([]);
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
                 onAddToCart={handleAddToCart}
                 products={products}
                 productsLoading={productsLoading}
             />
           }    
        />
     <Route
       path="/brand/:brandName"
         element={
          <BrandPage
            onAddToCart={handleAddToCart}
            products={products}
            productsLoading={productsLoading}
         />
        }
      />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              cartItems={cartItems}
              onPlaceOrder={handlePlaceOrder}
            />
          }
        />
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
         <Route
            path="/product/:productId"
                  element={<ProductDetails onAddToCart={handleAddToCart} />}
          />
        <Route path="/denim-voice" element={<DenimVoice />} /> 
        <Route
           path="/order-confirmation"
           element={<OrderConfirmation />}
        />
         <Route
          path="/search"
          element={
       <Search
         products={products}
          productsLoading={productsLoading}
          onAddToCart={handleAddToCart}
           />
        }
       />
     </Routes> 
  </BrowserRouter>
  );
}

export default App;

