import { Link } from 'react-router';
import { useBookmarks } from '../contexts/BookmarkContext';
import PokemonCard from '../components/PokemonCard';

export default function BookmarksPage() {
  const { bookmarks, removeBookmark, clearBookmarks } = useBookmarks();
  // This page and Navbar read the same Context, so their counts update together.
  return (
    <>
      <h1>My bookmarks</h1>
      <p role="status">{bookmarks.length} Pokémon saved</p>
      {bookmarks.length === 0 ? (
        <p>Your shelf is empty. <Link to="/pokemon">Browse Pokémon</Link> to save your first one.</p>
      ) : (
        <>
          <button className="secondary clear" onClick={clearBookmarks}>Clear all bookmarks</button>
          <div className="grid">
            {bookmarks.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} isBookmarked onRemove={removeBookmark} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
