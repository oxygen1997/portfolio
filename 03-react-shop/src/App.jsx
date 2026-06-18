import { useState, useMemo } from 'react';
import { products, categories } from './data/products.js';
import { useCart } from './hooks/useCart.js';
import Header from './components/Header.jsx';
import Filters from './components/Filters.jsx';
import ProductCard from './components/ProductCard.jsx';
import Cart from './components/Cart.jsx';

export default function App() {
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [category, setCategory] = useState('Все');
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const byCat = category === 'Все' || p.category === category;
      const byQuery = !q || p.title.toLowerCase().includes(q);
      return byCat && byQuery;
    });
  }, [category, query]);

  return (
    <>
      <Header cartCount={cart.totalCount} onCartClick={() => setCartOpen(true)} />

      <section className="hero">
        <div className="container">
          <h1 className="hero__title">Техника, которая радует</h1>
          <p className="hero__lead">Демо-магазин на React — каталог, фильтры и корзина.</p>
        </div>
      </section>

      <main className="container">
        <Filters
          categories={categories}
          active={category}
          onChange={setCategory}
          query={query}
          onQuery={setQuery}
        />

        {visible.length === 0 ? (
          <p className="empty-result">Ничего не найдено. Попробуйте изменить запрос.</p>
        ) : (
          <div className="grid">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={cart.add} />
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="container">
          © {new Date().getFullYear()} Маркет · демо-проект для портфолио на React
        </div>
      </footer>

      <Cart
        open={cartOpen}
        items={cart.items}
        totalPrice={cart.totalPrice}
        onClose={() => setCartOpen(false)}
        onChangeQty={cart.changeQty}
        onRemove={cart.remove}
        onClear={cart.clear}
      />
    </>
  );
}
