import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Heart, MessageCircle, Send } from "lucide-react";
import { products } from "../data/products";

function DenimVoice() {
  const location = useLocation();
  const requestedProduct = location.state?.product;

  const [productId, setProductId] = useState(
    requestedProduct?.id?.toString() || ""
  );
  const [size, setSize] = useState("");
  const [fit, setFit] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedProduct = products.find(
    (item) => item.id === Number(productId)
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const request = {
      productId,
      productName: selectedProduct.name,
      brand: selectedProduct.brand,
      requestedSize: size,
      preferredFit: fit,
      email,
      message,
      submittedAt: new Date().toISOString(),
    };

    // Temporary frontend demonstration.
    console.log("FOXSO Denim Voice request:", request);

    setSubmitted(true);
  };

  return (
    <main className="fox-denim-voice">

      <section className="fox-voice-hero">
        <Heart size={35} />
        <p className="section-label">YOUR VOICE MATTERS</p>
        <h1>Your Style. Your Say.</h1>
        <p>
          Couldn't find your size? Tell us what you love.
          Together, we can make FOXSO better for every girl.
        </p>
      </section>

      <section className="fox-voice-content">

        {submitted ? (
          <div className="fox-voice-success">
            <Heart size={48} />
            <h2>Thank you for speaking up!</h2>
            <p>
              Your request matters to us. Your feedback can help
              FOXSO understand what styles and sizes customers want.
            </p>
            <Link to="/" className="fox-voice-submit">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <form className="fox-voice-form" onSubmit={handleSubmit}>

            <div className="fox-voice-heading">
              <MessageCircle size={25} />
              <div>
                <h2>Tell us what you're looking for</h2>
                <p>Help us bring your favourite denim to you.</p>
              </div>
            </div>

            <label>Which jeans do you love? *</label>
            <select
              value={productId}
              onChange={(e) => {
                setProductId(e.target.value);
                setSize("");
              }}
              required
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.brand} - {product.name}
                </option>
              ))}
            </select>

            <label>Which size do you need? *</label>
            <div className="fox-voice-sizes">
              {["24", "26", "28", "30", "32", "34", "36", "38"].map(
                (item) => (
                  <button
                    type="button"
                    key={item}
                    className={size === item ? "active" : ""}
                    onClick={() => setSize(item)}
                  >
                    {item}
                  </button>
                )
              )}
            </div>

            <label>What fit do you prefer?</label>
            <select
              value={fit}
              onChange={(e) => setFit(e.target.value)}
            >
              <option value="">Choose your preferred fit</option>
              <option>Straight Fit</option>
              <option>Wide Leg</option>
              <option>Baggy</option>
              <option>High Waist</option>
              <option>Relaxed Fit</option>
              <option>Slim Fit</option>
              <option>Other</option>
            </select>

            <label>Your suggestions or message</label>
            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you want FOXSO to improve..."
            />

            <label>Email address (optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for future updates"
            />

            <button
              type="submit"
              className="fox-voice-submit"
              disabled={!productId || !size}
            >
              <Send size={17} />
              Share My Request
            </button>

            <p className="fox-voice-note">
              Your feedback helps us understand customer demand.
            </p>

          </form>
        )}
      </section>
    </main>
  );
}

export default DenimVoice;
