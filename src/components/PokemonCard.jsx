import { useState } from 'react';

export default function PokemonCard({ pokemon, isBookmarked, onAdd, onRemove }) {
  // Local state belongs here because this note draft only affects this card.
  const [note, setNote] = useState('');
  const [imageFailed, setImageFailed] = useState(false);

  function handleSubmit(event) {
    // Prevent the browser's default form reload; React handles creating the item.
    event.preventDefault();
    onAdd(pokemon, note);
    setNote('');
  }

  return (
    <article className="card">
      <span className="muted">#{String(pokemon.id).padStart(3, '0')}</span>
      {pokemon.image && !imageFailed
        ? <img src={pokemon.image} alt={pokemon.name} width="120" height="120"
            loading="lazy" onError={() => setImageFailed(true)} />
        : <div className="image-placeholder">Image unavailable</div>}
      <h2 className="pokemon-name">{pokemon.name}</h2>
      <p>{pokemon.types.join(' / ')}</p>
      {/* Conditional rendering reuses this card on both collection pages. */}
      {isBookmarked ? (
        <>
          {pokemon.note && <p className="note">{pokemon.note}</p>}
          <button className="secondary" onClick={() => onRemove(pokemon.id)}
            aria-label={`Remove ${pokemon.name} bookmark`}>Remove bookmark</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Controlled input: React state is the source of truth for the value. */}
          <label htmlFor={`note-${pokemon.id}`}>Note (optional)</label>
          <input id={`note-${pokemon.id}`} value={note} maxLength={120}
            placeholder="Why save this Pokémon?"
            onChange={(event) => setNote(event.target.value)} />
          <button type="submit" aria-label={`Bookmark ${pokemon.name}`}>Add bookmark</button>
        </form>
      )}
    </article>
  );
}
