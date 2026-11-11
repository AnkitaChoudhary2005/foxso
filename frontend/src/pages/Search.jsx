
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Search({ products, productsLoading, onAddToCart }) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const filteredProducts = products.filter((product) => {
    const searchText = `${product.name} ${product.brand} ${product.category || ""}`.toLowerCase();

    return (
      searchText.includes(query.toLowerCase()) &&
      product.price > 800
    );
  });

  return (
    <main className="collection-section">
      <div className="collection-heading">
        <div>
          <p className="section-label">FOXSO WOMEN</p>
          <h2>Search Results</h2>
          <p>Showing results for "{query}"</p>
        </div>

        <div className="collection-count">
          {filteredProducts.length} Products
        </div>
      </div>

      {productsLoading ? (
        <p>Loading products...</p>
      ) : filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <p>No products found. Try another search.</p>
      )}
    </main>
  );
}

export default Search;

