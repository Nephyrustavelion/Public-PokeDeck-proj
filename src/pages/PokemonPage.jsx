import { useEffect, useState } from 'react';
import { useBookmarks } from '../contexts/BookmarkContext';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import Spinner from '../components/Spinner';

export default function PokemonPage() {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  useEffect(() => {
    // Cleanup cancels requests when leaving the page or starting another attempt.
    const controller = new AbortController();
    async function fetchJSON(url) {
      const response = await fetch(url, { signal: controller.signal });
      // fetch rejects network failures, but HTTP errors need an explicit check.
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      return response.json();
    }
    async function loadPokemon() {
      setLoading(true);
      setError('');
      try {
        // The list endpoint supplies names and detail URLs, not full card data.
        const list = await fetchJSON('https://pokeapi.co/api/v2/pokemon?limit=30');
        // Promise.all waits for the small collection of detail requests together.
        const details = await Promise.all(list.results.map((item) => fetchJSON(item.url)));
        if (!controller.signal.aborted) {
          // Normalize API data so components only receive the fields they need.
          setPokemon(details.map((item) => ({
            id: item.id,
            name: item.name,
            image: item.sprites.front_default,
            types: item.types.map((entry) => entry.type.name),
          })));
        }
      } catch (err) {
        if (!controller.signal.aborted) setError(`Could not load Pokémon. ${err.message}. Please retry.`);
      } finally {
        // An older, cancelled request must not change the latest loading state.
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadPokemon();
    return () => controller.abort();
    // Changing retryCount reruns the effect; typing in search does not fetch again.
  }, [retryCount]);

  // Derived state: calculate results from existing state instead of storing a copy.
  const query = searchTerm.trim().toLowerCase();
  const filteredPokemon = pokemon.filter((item) =>
    item.name.includes(query) || String(item.id) === query,
  );

  return (
    <>
      <h1>Pokémon catalogue</h1>
      <p>Browse the first 30 Pokémon. Add an optional note and save a favourite.</p>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      {loading ? <Spinner /> : error ? (
        <div role="alert"><p>{error}</p>
          {/* Functional updates use the previous state safely. */}
          <button onClick={() => setRetryCount((count) => count + 1)}>Retry</button>
        </div>
      ) : (
        <>
          <p role="status">{filteredPokemon.length} of {pokemon.length} Pokémon shown</p>
          {filteredPokemon.length === 0 && <p>No matches in the first 30 Pokémon. Try another name or ID.</p>}
          <div className="grid">
            {/* Stable ID keys help React track each card when the list changes. */}
            {filteredPokemon.map((item) => {
              const saved = bookmarks.find((bookmark) => bookmark.id === item.id);
              return <PokemonCard key={item.id} pokemon={saved || item} isBookmarked={Boolean(saved)}
                onAdd={addBookmark} onRemove={removeBookmark} />;
            })}
          </div>
        </>
      )}
    </>
  );
}
