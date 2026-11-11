import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowLeft, Heart } from "lucide-react";
import { products } from "../data/products";

function ProductDetails({ onAddToCart }) {
  const navigate = useNavigate();
  const { productId } = useParams();

  const product = products.find(
    (item) => item.id === Number(productId)
  );

  const [selectedSize, setSelectedSize] = useState("");

  if (!product) {
    return (
      <main className="collection-section">
        <h2>Product not found</h2>
        <Link to="/">Back to Shopping</Link>
      </main>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select your size first!");
      return;
    }

    onAddToCart({ ...product, selectedSize });
  };

  const handleRequestSize = () => {
    navigate("/denim-voice", {
      state: { product }
    });
  };

  return (
    <main className="fox-product-details">

      <Link to="/" className="fox-back-link">
        <ArrowLeft size={18} />
        Back to Shopping
      </Link>

      <div className="fox-details-layout">

        <div className="fox-details-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="fox-details-info">

          <p className="section-label">{product.brand}</p>

          <h1>{product.name}</h1>

          <h2>
            ₹{product.price.toLocaleString("en-IN")}
          </h2>

          <p>{product.description}</p>

          <p className="fox-stock">
            {product.stock > 0
              ? `Available in sample inventory: ${product.stock}`
              : "Currently unavailable"}
          </p>

          <label className="size-label">
            Select Your Size
          </label>

          <div className="size-options">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                className={
                  selectedSize === size ? "selected-size" : ""
                }
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <button
            className="add-cart-button fox-details-cart"
            onClick={handleAddToCart}
          >
            <ShoppingBag size={18} />
            Add to Cart
          </button>

          <button
            type="button"
            className="fox-request-size-button"
            onClick={handleRequestSize}
          >
            <Heart size={18} />
            Can't find your size? Request it here
          </button>

        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
