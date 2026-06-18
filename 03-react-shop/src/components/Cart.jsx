import { formatPrice } from '../utils/format.js';

export default function Cart({ open, items, totalPrice, onClose, onChangeQty, onRemove, onClear }) {
  return (
    <>
      <div className={`overlay ${open ? 'overlay--show' : ''}`} onClick={onClose} />
      <aside className={`cart ${open ? 'cart--open' : ''}`} aria-hidden={!open}>
        <div className="cart__head">
          <h2 className="cart__title">Корзина</h2>
          <button className="cart__close" onClick={onClose} aria-label="Закрыть">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart__empty">
            <span>🛒</span>
            <p>Корзина пуста</p>
            <small>Добавьте товары из каталога</small>
          </div>
        ) : (
          <>
            <ul className="cart__list">
              {items.map((item) => (
                <li className="cart-item" key={item.id}>
                  <div className="cart-item__image">{item.emoji}</div>
                  <div className="cart-item__info">
                    <span className="cart-item__title">{item.title}</span>
                    <span className="cart-item__price">{formatPrice(item.price)}</span>
                  </div>
                  <div className="cart-item__qty">
                    <button onClick={() => onChangeQty(item.id, -1)} aria-label="Уменьшить">−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => onChangeQty(item.id, 1)} aria-label="Увеличить">+</button>
                  </div>
                  <button
                    className="cart-item__remove"
                    onClick={() => onRemove(item.id)}
                    aria-label="Удалить"
                  >
                    🗑
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart__footer">
              <div className="cart__total">
                <span>Итого</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>
              <button className="btn btn--checkout">Оформить заказ</button>
              <button className="cart__clear" onClick={onClear}>
                Очистить корзину
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
