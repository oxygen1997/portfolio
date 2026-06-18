import { useState, useEffect, useCallback, useMemo } from 'react';

const STORAGE_KEY = 'react-shop-cart';

function readInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Корзина: список { ...product, qty }. Состояние живёт в localStorage,
// чтобы товары не пропадали при перезагрузке страницы.
export function useCart() {
  const [items, setItems] = useState(readInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = useCallback((product) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const changeQty = useCallback((id, delta) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const remove = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const totalCount = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((s, i) => s + i.qty * i.price, 0), [items]);

  return { items, add, changeQty, remove, clear, totalCount, totalPrice };
}
