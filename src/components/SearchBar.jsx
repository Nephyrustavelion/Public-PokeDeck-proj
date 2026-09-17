export default function SearchBar({ value, onChange }) {
  // State is lifted to the page; this reusable component receives value + callback.
  return (
    <div className="search">
      <label htmlFor="pokemon-search">Search the loaded catalogue</label>
      <input id="pokemon-search" type="search" placeholder="Try pikachu or 25"
        value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}
