
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { brands } from "../data/products";

function Home({ onAddToCart, products, productsLoading }) {
  const [selectedBrand, setSelectedBrand] = useState("ALL");

  const filteredProducts = products.filter(
    (product) =>
      product.price > 800 &&
      (selectedBrand === "ALL" || product.brand === selectedBrand)
  );

  return (
    <main className="collection-page">
      <section className="collection-banner">
        <p className="banner-label">THE DENIM EDIT</p>
        <h1>Women's Jeans Collection</h1>
        <p>Find your perfect fit. Own your style.</p>
      </section>

      <section className="collection-section">
        <div className="collection-heading">
          <div>
            <p className="section-label">FOXSO WOMEN</p>
            <h2>Denim Collection</h2>
            <p>Premium styles from your favourite brands.</p>
          </div>

          <div className="collection-count">
            {filteredProducts.length} Products
          </div>
        </div>

        <div className="brand-filters">
          <SlidersHorizontal size={18} />

          {["ALL", ...brands].map((brand) => (
            <button
              key={brand}
              className={selectedBrand === brand ? "active" : ""}
              onClick={() => setSelectedBrand(brand)}
            >
              {brand}
            </button>
          ))}
        </div>

        <div className="price-note">
          Discover your favourite denim. Every style above ₹800.
        </div>
        
        {productsLoading ? (
          <p>Loading products...</p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;

