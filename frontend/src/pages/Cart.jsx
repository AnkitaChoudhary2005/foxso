
import { Link } from "react-router-dom";

function Cart({ cartItems, onUpdateQuantity, onRemoveItem }) {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className="collection-section fox-cart-page">
      <p className="section-label">YOUR FOXSO BAG</p>
      <h1>My Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="fox-empty-cart">
          <h2>Your shopping cart is empty.</h2>
          <p>Find your favourite denim styles.</p>
          <Link to="/" className="fox-continue-shopping">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              className="cart-product"
              key={`${item.id}-${item.selectedSize}`}
            >
              <img src={item.image} alt={item.name} />

              <div>
                <h3>{item.name}</h3>
                <p>Brand: {item.brand}</p>
                <p>Size: {item.selectedSize}</p>
                <p>Price: ₹{item.price.toLocaleString("en-IN")}</p>

                <button
                  onClick={() =>
                    onUpdateQuantity(
                      item.id,
                      item.selectedSize,
                      item.quantity - 1
                    )
                  }
                >
                  -
                </button>

                <strong> {item.quantity} </strong>

                <button
                  onClick={() =>
                    onUpdateQuantity(
                      item.id,
                      item.selectedSize,
                      item.quantity + 1
                    )
                  }
                >
                  +
                </button>

                <button
                  onClick={() =>
                    onRemoveItem(item.id, item.selectedSize)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="fox-cart-summary">
            <p>Subtotal</p>
            <h2>₹{subtotal.toLocaleString("en-IN")}</h2>

            <Link to="/checkout" className="fox-place-order">
              Place Order →
            </Link>

            <Link to="/" className="fox-continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </>
      )}
    </main>
  );
}

export default Cart;

