// A pure reducer returns the next state from the previous state and an action.
// Keep fetch, localStorage, and other side effects outside this function.
export function bookmarkReducer(state, action) {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      // Prevent duplicates even if an add action is dispatched twice.
      if (state.some((item) => item.id === action.payload.id)) return state;
      // Spread creates a new array; never mutate React state with push/splice.
      return [...state, action.payload];
    case 'REMOVE_BOOKMARK':
      // filter keeps all bookmarks except the matching Pokémon ID.
      return state.filter((item) => item.id !== action.payload);
    case 'CLEAR_BOOKMARKS':
      return [];
    default:
      return state;
  }
}
