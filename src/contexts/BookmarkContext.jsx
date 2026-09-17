import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { bookmarkReducer } from '../reducers/bookmarkReducer';
import { readStorage, writeStorage } from '../utils/storage';

const BookmarkContext = createContext(null);

function loadBookmarks(key) {
  const saved = readStorage(key, []);
  if (!Array.isArray(saved)) return [];
  // Validate persisted data before rendering it; old or edited data may be invalid.
  return saved.filter((item, index, items) =>
    item && Number.isInteger(item.id) && typeof item.name === 'string' &&
    (item.image === null || typeof item.image === 'string') &&
    Array.isArray(item.types) && item.types.every((type) => typeof type === 'string') &&
    typeof item.note === 'string' && items.findIndex((other) => other?.id === item.id) === index,
  );
}

export function BookmarkProvider({ username, children }) {
  // Each normalized demo username gets its own browser-local bookmark collection.
  const storageKey = `pokeshelf:bookmarks:${username}`;
  // The third argument initializes reducer state from storage on mount.
  const [bookmarks, dispatch] = useReducer(bookmarkReducer, storageKey, loadBookmarks);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    setStorageError(!writeStorage(storageKey, bookmarks));
  }, [storageKey, bookmarks]);

  // Action helpers hide action object syntax from the pages that consume Context.
  function addBookmark(pokemon, note) {
    dispatch({ type: 'ADD_BOOKMARK', payload: { ...pokemon, note: note.trim() } });
  }
  function removeBookmark(id) { dispatch({ type: 'REMOVE_BOOKMARK', payload: id }); }
  function clearBookmarks() { dispatch({ type: 'CLEAR_BOOKMARKS' }); }

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, clearBookmarks }}>
      {storageError && <p role="alert" className="notice">Bookmarks work for this session, but cannot be saved in this browser.</p>}
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) throw new Error('useBookmarks must be inside BookmarkProvider');
  return context;
}
