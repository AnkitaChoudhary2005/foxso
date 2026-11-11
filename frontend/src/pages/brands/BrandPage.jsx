import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

function BrandPage({ onAddToCart, products, productsLoading }) {
  const { brandName } = useParams();

  const brandProducts = products.filter(
    (product) =>
      product.brand.toLowerCase() === brandName.toLowerCase() &&
      product.price > 800
  );

  const displayName = brandName.toUpperCase();

  return (
    <main className="collection-section">
      <div className="collection-heading">
        <div>
          <p className="section-label">FOXSO WOMEN</p>
          <h2>{displayName} Jeans Collection</h2>
          <p>Explore women's denim from {displayName}.</p>
        </div>

        <div className="collection-count">
          {brandProducts.length} Products
        </div>
      </div>

      {productsLoading ? (
        <p>Loading products...</p>
      ) : brandProducts.length > 0 ? (
        <div className="product-grid">
          {brandProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <p>No products available for this brand yet.</p>
      )}
    </main>
  );
}

export default BrandPage;
