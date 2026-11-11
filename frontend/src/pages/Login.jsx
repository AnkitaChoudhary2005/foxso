
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("Login interface ready. Authentication will be connected with the backend later.");
  };

  return (
    <main className="fox-auth-page">
      <div className="fox-auth-card">
        <Link to="/" className="fox-auth-logo">
          FOXSO<span>.</span>
        </Link>

        <p className="section-label">WELCOME BACK</p>
        <h1>Login to your account</h1>
        <p className="fox-auth-subtitle">
          Your favourite denim styles are waiting for you.
        </p>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <div className="fox-auth-input">
            <Mail size={19} />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label>Password</label>
          <div className="fox-auth-input">
            <LockKeyhole size={19} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <button type="submit" className="fox-auth-submit">
            Login
          </button>
        </form>

        {message && <p className="fox-auth-message">{message}</p>}

        <p className="fox-auth-switch">
          Don't have an account? <Link to="/signup">Create Account</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;

