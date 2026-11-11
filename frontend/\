
import { useState } from "react";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const handleSearch = (event) => {
    event.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      closeMenu();
    }
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        FOXSO<span>.</span>
      </Link>

      <form className="navbar-search" onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Search jeans or brands..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button type="submit" aria-label="Search products">
          <Search size={20} />
        </button>
      </form>

      <nav className={`navbar-links ${menuOpen ? "menu-open" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/brand/suo" onClick={closeMenu}>SUO</Link>
        <Link to="/brand/glitch" onClick={closeMenu}>GLITCH</Link>
        <Link to="/brand/stylecast" onClick={closeMenu}>STYLECAST</Link>
        <Link to="/brand/revolte" onClick={closeMenu}>REVOLTE</Link>
        <Link to="/brand/only" onClick={closeMenu}>ONLY</Link>
        <Link to="/brand/westside" onClick={closeMenu}>WESTSIDE</Link>
        <Link to="/denim-voice" onClick={closeMenu}>DENIM VOICE</Link>
      </nav>

      <div className="navbar-actions">
        <Link to="/login" aria-label="Login">
          <User size={21} />
        </Link>

        <Link to="/cart" className="cart-icon" aria-label="Shopping cart">
          <ShoppingBag size={21} />
          <span>{cartCount}</span>
        </Link>

        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;

