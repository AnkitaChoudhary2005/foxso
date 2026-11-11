import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Phone, LockKeyhole } from "lucide-react";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setMessage("Signup interface ready. Account creation will be connected to the backend later.");
  };

  return (
    <main className="fox-auth-page">
      <div className="fox-auth-card">
        <Link to="/" className="fox-auth-logo">
          FOXSO<span>.</span>
        </Link>

        <p className="section-label">JOIN FOXSO</p>
        <h1>Create your account</h1>
        <p className="fox-auth-subtitle">
          Create an account and discover your favourite denim.
        </p>

        <form onSubmit={handleSignup}>
          <label>Full Name</label>
          <div className="fox-auth-input">
            <User size={19} />
            <input
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <label>Email Address</label>
          <div className="fox-auth-input">
            <Mail size={19} />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <label>Phone Number</label>
          <div className="fox-auth-input">
            <Phone size={19} />
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              pattern="[0-9]{10}"
              maxLength={10}
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <label>Password</label>
          <div className="fox-auth-input">
            <LockKeyhole size={19} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              minLength={8}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>

          <label>Confirm Password</label>
          <div className="fox-auth-input">
            <LockKeyhole size={19} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label="Toggle confirm password visibility"
            >
              {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>

          <button type="submit" className="fox-auth-submit">
            Create Account
          </button>
        </form>

        {message && <p className="fox-auth-message">{message}</p>}

        <p className="fox-auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
}

export default Signup;
