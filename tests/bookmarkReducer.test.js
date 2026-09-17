import test from 'node:test';
import assert from 'node:assert/strict';
import { bookmarkReducer } from '../src/reducers/bookmarkReducer.js';

// Node's built-in test runner checks business logic without adding a test library.
const pikachu = Object.freeze({ id: 25, name: 'pikachu', note: 'My favourite' });
const bulbasaur = Object.freeze({ id: 1, name: 'bulbasaur', note: '' });

test('adding preserves the original state and keeps the note', () => {
  const original = Object.freeze([bulbasaur]);
  const next = bookmarkReducer(original, { type: 'ADD_BOOKMARK', payload: pikachu });
  assert.deepEqual(next, [bulbasaur, pikachu]);
  assert.deepEqual(original, [bulbasaur]);
});

test('adding the same Pokémon twice cannot create duplicate bookmarks', () => {
  const original = [pikachu];
  assert.equal(bookmarkReducer(original, { type: 'ADD_BOOKMARK', payload: pikachu }), original);
});

test('removing one Pokémon retains the others', () => {
  assert.deepEqual(bookmarkReducer([bulbasaur, pikachu], {
    type: 'REMOVE_BOOKMARK', payload: 25,
  }), [bulbasaur]);
});

test('clear empties the collection; unknown actions leave it unchanged', () => {
  const original = [pikachu];
  assert.deepEqual(bookmarkReducer(original, { type: 'CLEAR_BOOKMARKS' }), []);
  assert.equal(bookmarkReducer(original, { type: 'UNKNOWN' }), original);
});
