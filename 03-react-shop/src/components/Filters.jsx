export default function Filters({ categories, active, onChange, query, onQuery }) {
  return (
    <div className="filters">
      <div className="filters__cats">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`chip ${active === cat ? 'chip--active' : ''}`}
            onClick={() => onChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <input
        className="search"
        type="search"
        placeholder="Поиск товара…"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
      />
    </div>
  );
}
