export default function Header({ cartCount, onCartClick }) {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#" className="logo">
          <span className="logo__mark">🛍️</span> Маркет
        </a>
        <button className="cart-btn" onClick={onCartClick} aria-label="Открыть корзину">
          🛒 Корзина
          {cartCount > 0 && <span className="cart-btn__badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}
