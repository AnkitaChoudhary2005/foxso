
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select your size first!");
      return;
    }

    onAddToCart({
      ...product,
      selectedSize,
    });
  };

  return (
    <article className="product-card">
      <Link
        to={`/product/${product.id}`}
        className="fox-product-link"
      >
        <div className="product-image">
          <img src={product.image} alt={product.name} />
          <span className="product-brand">{product.brand}</span>
        </div>

        <div className="product-info">
          <p>{product.brand}</p>
          <h3>{product.name}</h3>
          <strong>₹{product.price.toLocaleString("en-IN")}</strong>
        </div>
      </Link>

      <div className="product-info">
        <label className="size-label">Select Size</label>

        <div className="size-options">
          {(product.sizes || ["26", "28", "30", "32", "34"]).map((size) => (
            <button
              key={size}
              type="button"
              className={selectedSize === size ? "selected-size" : ""}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        <button className="add-cart-button" onClick={handleAddToCart}>
          <ShoppingBag size={17} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;

