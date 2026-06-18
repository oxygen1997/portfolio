import { formatPrice } from '../utils/format.js';

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="product">
      {product.badge && <span className="product__badge">{product.badge}</span>}
      <div className="product__image">{product.emoji}</div>
      <div className="product__body">
        <span className="product__cat">{product.category}</span>
        <h3 className="product__title">{product.title}</h3>
        <div className="product__footer">
          <span className="product__price">{formatPrice(product.price)}</span>
          <button className="btn btn--add" onClick={() => onAdd(product)}>
            В корзину
          </button>
        </div>
      </div>
    </article>
  );
}
