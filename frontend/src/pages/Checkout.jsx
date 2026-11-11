
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  CreditCard,
  ShoppingBag,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ArrowLeft,
  Gift,
} from "lucide-react";

function Checkout({ cartItems, onPlaceOrder }) {
  const navigate = useNavigate();

  const emptyAddress = {
    fullName: "",
    phone: "",
    house: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
  };

  const [address, setAddress] = useState(emptyAddress);
  const [savedAddress, setSavedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressError, setAddressError] = useState("");
  const [paymentMode, setPaymentMode] = useState("COD");
  const [location, setLocation] = useState("");
  const [locationMessage, setLocationMessage] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryCharge = 0;
  const total = subtotal + deliveryCharge;

  const updateAddress = (event) => {
    setAddress({
      ...address,
      [event.target.name]: event.target.value,
    });
    setAddressError("");
  };

  const saveAddress = () => {
    const {
      fullName,
      phone,
      house,
      area,
      city,
      state,
      pincode,
    } = address;

    if (
      !fullName.trim() ||
      !phone.trim() ||
      !house.trim() ||
      !area.trim() ||
      !city.trim() ||
      !state.trim() ||
      !pincode.trim()
    ) {
      setAddressError("Please complete all delivery address fields.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setAddressError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^[0-9]{6}$/.test(pincode)) {
      setAddressError("Please enter a valid 6-digit PIN code.");
      return;
    }

    setSavedAddress({ ...address });
    setShowAddressForm(false);
    setAddressError("");
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage("Location is not supported by this browser.");
      return;
    }

    setLocationLoading(true);
    setLocationMessage("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(
          `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`
        );
        setLocationMessage(
          "Location captured. Please enter your full postal address below."
        );
        setLocationLoading(false);
      },
      () => {
        setLocationMessage(
          "Unable to get location. Please enter your address manually."
        );
        setLocationLoading(false);
      }
    );
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();

    if (!savedAddress) {
      setAddressError("Please add and save your delivery address first.");
      setShowAddressForm(true);
      return;
    }

    if (cartItems.length === 0) return;

    const order = {
      orderId: `FOXSO-${Date.now()}`,
      items: cartItems,
      address: savedAddress,
      location,
      paymentMode,
      subtotal,
      deliveryCharge,
      total,
      orderedAt: new Date().toISOString(),
    };

    onPlaceOrder(order);

    navigate("/order-confirmation", {
      state: { order },
    });
  };

  if (cartItems.length === 0) {
    return (
      <main className="fox-checkout">
        <div className="fox-empty-checkout">
          <ShoppingBag size={42} />
          <h1>Your bag is waiting for you</h1>
          <p className="fox-muted">
            Add something lovely to your cart.
          </p>
          <Link to="/" className="fox-primary-button">
            Explore Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="fox-checkout">
      <div className="fox-checkout-top">
        <Link to="/cart" className="fox-back-link">
          <ArrowLeft size={17} /> Back to bag
        </Link>

        <div className="fox-secure-label">
          <ShieldCheck size={17} /> SECURE CHECKOUT
        </div>
      </div>

      <div className="fox-checkout-heading">
        <p className="fox-eyebrow">
          A LITTLE SOMETHING JUST FOR YOU
        </p>
        <h1>Almost yours<span>.</span></h1>
        <p>Review your pieces and complete your order.</p>
      </div>

      <form
        className="fox-checkout-layout"
        onSubmit={handlePlaceOrder}
      >
        <div className="fox-checkout-left">

          {/* ORDER ITEMS */}
          <section className="fox-panel">
            <div className="fox-panel-heading">
              <div className="fox-step-number">01</div>
              <div>
                <h2>Your lovely picks</h2>
                <p>{cartItems.length} item(s) in your bag</p>
              </div>
            </div>

            <div className="fox-order-items">
              {cartItems.map((item) => (
                <article
                  className="fox-order-item"
                  key={`${item.id}-${item.selectedSize}`}
                >
                  <img src={item.image} alt={item.name} />

                  <div className="fox-item-info">
                    <span className="fox-item-brand">
                      {item.brand}
                    </span>

                    <h3>{item.name}</h3>
                    <p>Size: {item.selectedSize}</p>
                    <p>Quantity: {item.quantity}</p>

                    <strong>
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </strong>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* DELIVERY ADDRESS */}
          <section className="fox-panel">
            <div className="fox-panel-heading">
              <div className="fox-step-number">02</div>
              <div>
                <h2>Where should we deliver?</h2>
                <p>Your delivery address</p>
              </div>
            </div>

            {savedAddress && !showAddressForm ? (
              <div className="fox-saved-address">
                <div className="fox-address-topline">
                  <span className="fox-address-tag">
                    <MapPin size={14} /> HOME / DELIVERY
                  </span>
                  <CheckCircle2 size={19} />
                </div>

                <h3>{savedAddress.fullName}</h3>
                <p>{savedAddress.phone}</p>
                <p>
                  {savedAddress.house}, {savedAddress.area}
                </p>
                <p>
                  {savedAddress.city}, {savedAddress.state} -{" "}
                  {savedAddress.pincode}
                </p>

                <button
                  type="button"
                  className="fox-text-button"
                  onClick={() => {
                    setAddress({ ...savedAddress });
                    setShowAddressForm(true);
                  }}
                >
                  Edit address
                </button>
              </div>
            ) : (
              <div className="fox-address-form">
                <button
                  type="button"
                  className="fox-location-button"
                  onClick={useCurrentLocation}
                  disabled={locationLoading}
                >
                  <MapPin size={17} />
                  {locationLoading
                    ? "Getting location..."
                    : "Use my current location"}
                </button>

                {locationMessage && (
                  <p className="fox-location-message">
                    {locationMessage}
                  </p>
                )}

                {location && (
                  <p className="fox-location-message">
                    Location captured. Full address is still required.
                  </p>
                )}

                <div className="fox-input-grid">
                  <input
                    name="fullName"
                    placeholder="Full name"
                    value={address.fullName}
                    onChange={updateAddress}
                  />

                  <input
                    name="phone"
                    type="tel"
                    placeholder="Mobile number"
                    value={address.phone}
                    onChange={updateAddress}
                  />

                  <input
                    name="house"
                    placeholder="House / Flat / Building"
                    value={address.house}
                    onChange={updateAddress}
                  />

                  <input
                    name="area"
                    placeholder="Area / Street / Landmark"
                    value={address.area}
                    onChange={updateAddress}
                  />

                  <input
                    name="city"
                    placeholder="City"
                    value={address.city}
                    onChange={updateAddress}
                  />

                  <input
                    name="state"
                    placeholder="State"
                    value={address.state}
                    onChange={updateAddress}
                  />

                  <input
                    name="pincode"
                    placeholder="6-digit PIN code"
                    value={address.pincode}
                    onChange={updateAddress}
                  />
                </div>

                <button
                  type="button"
                  className="fox-save-address"
                  onClick={saveAddress}
                >
                  Save delivery address
                </button>
              </div>
            )}

            {addressError && (
              <p className="fox-address-error">{addressError}</p>
            )}

            
          </section>

          {/* PAYMENT */}
          <section className="fox-panel">
            <div className="fox-panel-heading">
              <div className="fox-step-number">03</div>
              <div>
                <h2>Payment your way</h2>
                <p>Choose how you'd like to pay</p>
              </div>
            </div>

            <label
              className={`fox-payment-choice ${
                paymentMode === "COD" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMode === "COD"}
                onChange={(event) =>
                  setPaymentMode(event.target.value)
                }
              />

              <span className="fox-payment-icon">
                <CreditCard size={20} />
              </span>

              <span>
                <strong>Cash on Delivery</strong>
                <small>Pay when your order arrives</small>
              </span>

              <CheckCircle2
                className="fox-payment-check"
                size={19}
              />
            </label>

            <div className="fox-payment-choice fox-payment-disabled">
              <span className="fox-payment-icon">
                <CreditCard size={20} />
              </span>

              <span>
                <strong>UPI / Credit or Debit Card</strong>
                <small>Online payment coming soon</small>
              </span>

              <span className="fox-coming-soon">SOON</span>
            </div>
          </section>
        </div>

        {/* ORDER SUMMARY */}
        <aside className="fox-checkout-right">
          <div className="fox-summary-card">
            <div className="fox-summary-heading">
              <h2>Order summary</h2>
              <ShoppingBag size={20} />
            </div>

            <div className="fox-summary-line">
              <span>Bag total</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>

            <div className="fox-summary-line">
              <span>Delivery</span>
              <strong className="fox-free">FREE</strong>
            </div>

            <div className="fox-summary-line">
              <span>Discount</span>
              <span>—</span>
            </div>

            <div className="fox-summary-total">
              <span>Total amount</span>
              <strong>₹{total.toLocaleString("en-IN")}</strong>
            </div>

            <button
              type="submit"
              className="fox-place-order"
              disabled={!savedAddress}
            >
              PLACE ORDER <span>→</span>
            </button>

            {!savedAddress && (
              <p className="fox-summary-hint">
                Save your delivery address to place your order.
              </p>
            )}

            <div className="fox-summary-note">
              <Gift size={17} />
              <span>Free delivery on your FOXSO order</span>
            </div>

            <div className="fox-summary-note">
              <Truck size={17} />
              <span>Delivery details confirmed after order</span>
            </div>

            <div className="fox-summary-note">
              <ShieldCheck size={17} />
              <span>Safe and secure checkout</span>
            </div>
          </div>

          <p className="fox-summary-footnote">
            By placing your order, you agree to our store terms.
          </p>
        </aside>
      </form>
    </main>
  );
}

export default Checkout;

