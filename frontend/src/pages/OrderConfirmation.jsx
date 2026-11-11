
import { Link, useLocation } from "react-router-dom";
import {
  CheckCircle2,
  Package,
  MapPin,
  CreditCard,
  ShoppingBag,
} from "lucide-react";

function OrderConfirmation() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return (
      <main className="fox-checkout">
        <div className="fox-success">
          <h1>No order details found</h1>
          <p>Please place an order first.</p>
          <Link to="/" className="fox-primary-button">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="fox-confirmation">
      <section className="fox-confirmation-card">
        <div className="fox-confirmation-icon">
          <CheckCircle2 size={55} />
        </div>

        <p className="fox-eyebrow">THANK YOU FOR CHOOSING FOXSO</p>
        <h1>Order Confirmed!</h1>
        <p className="fox-confirmation-message">
          Your order has been placed successfully.
          We hope you love your new denim!
        </p>

        <div className="fox-confirmation-order-id">
          <span>ORDER ID</span>
          <strong>{order.orderId}</strong>
        </div>

        <div className="fox-confirmation-section">
          <h2><Package size={19} /> Your Items</h2>

          {order.items.map((item) => (
            <div className="fox-confirmation-item" key={`${item.id}-${item.selectedSize}`}>
              <img src={item.image} alt={item.name} />
              <div>
                <strong>{item.name}</strong>
                <p>{item.brand} · Size {item.selectedSize}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <strong>
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </strong>
            </div>
          ))}
        </div>

        <div className="fox-confirmation-section">
          <h2><MapPin size={19} /> Delivery Address</h2>
          <strong>{order.address.fullName}</strong>
          <p>{order.address.phone}</p>
          <p>
            {order.address.house}, {order.address.area},
            {" "}{order.address.city}, {order.address.state}
            {" "}- {order.address.pincode}
          </p>
        </div>

        <div className="fox-confirmation-section">
          <h2><CreditCard size={19} /> Payment Details</h2>
          <p>
            Payment method:{" "}
            <strong>
              {order.paymentMode === "COD"
                ? "Cash on Delivery"
                : order.paymentMode}
            </strong>
          </p>
          <p>Subtotal: ₹{order.subtotal.toLocaleString("en-IN")}</p>
          <p>Delivery: FREE</p>
          <div className="fox-confirmation-total">
            <span>Order Total</span>
            <strong>₹{order.total.toLocaleString("en-IN")}</strong>
          </div>
        </div>

        <Link to="/" className="fox-primary-button">
          <ShoppingBag size={18} /> Continue Shopping
        </Link>
      </section>
    </main>
  );
}

export default OrderConfirmation;

