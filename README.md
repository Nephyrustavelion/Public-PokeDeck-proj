# PokéShelf

A small Pokémon bookmark catalogue for people learning React. Sign in with a demo name, browse Pokémon, and create your own bookmark collection with optional notes.

This is a beginner-friendly Module 2 scaffold, with comments beside each feature and React concept. It uses plain JavaScript and CSS, three pages, and no backend.

## Install and run

1. Install Node.js 22.12 or newer (Node 24 LTS is suitable). npm comes with the standard Node installer.
2. Extract the ZIP. Open the extracted `pokeshelf` folder in VS Code.
3. Open a terminal **inside that folder**, where `package.json` lives.
4. Run:

```sh
npm install
npm run dev
```

Open the local address printed in the terminal, normally http://localhost:5173. Keep the terminal running; press Ctrl+C to stop. Do not double-click `index.html` or run `npm create vite` again: the scaffold is already included.

If using the supplied destination on Windows:

```powershell
cd E:\NTUPACE_AIEng\Module2-CODE-Project\pokeshelf
npm install
npm run dev
```

Other commands:

```sh
npm test          # Four reducer behavior tests using Node's built-in runner
npm run build    # Create the production dist folder
npm run preview  # Preview that production build locally
```

This project was installed with pnpm, so a `pnpm-lock.yaml` is included. For the exact locked dependency tree, use pnpm 11 and `pnpm install --frozen-lockfile`, then `pnpm dev`. The npm commands above also work; npm creates its own `package-lock.json`. Choose one package manager for your team and commit its lockfile.

No API key or environment file is needed. Installation and catalogue loading require internet access.

## Try the app

1. Enter a name such as `Ash` and log in. Names are trimmed and lowercased.
2. Search for `pikachu` or `25` in the catalogue.
3. Type an optional note, then submit **Add bookmark**. This creates a bookmark object from a controlled form.
4. Open **My bookmarks**. Notice that the navigation count and collection share the same state.
5. Refresh: the login, saved Pokémon, and notes are restored from localStorage.
6. Remove one bookmark, or use **Clear all bookmarks** to empty the collection immediately.
7. Log out and use another name to see a separate collection. Log back in with the original name to restore its bookmarks.

## Deliberately small scope

- Search only filters the **first 30 Pokémon** already loaded, including Pikachu. It matches part of a name or an exact numeric ID, such as `25`. It is not a search of the entire Pokédex.
- The API list request is followed by 30 detail requests for images and types. A failure displays an error and Retry button. Navigating away cancels outstanding requests.
- Mock login is a learning exercise, not secure authentication. Anyone using the same name in this browser can access that demo collection. No passwords are requested or stored.
- Data stays in this browser on this origin (host and port); it does not sync across devices. Clearing browser data clears the collection. If storage is blocked/full, a warning appears and the app continues in memory.
- No pagination, edit-note feature, database, state library, or custom performance optimization is included. Notes can be changed by removing and re-adding a bookmark.
- Development StrictMode may start and cancel a first fetch before repeating it. This intentionally checks effect cleanup.

## File guide

```text
pokeshelf/
  index.html                 Browser entry point
  package.json               Dependencies and commands
  vite.config.js             Vite + React setup
  pnpm-lock.yaml             Locked dependency versions
  src/
    main.jsx                 Mount React, router, and auth provider
    App.jsx                  Routes and signed-in layout
    styles.css               Small responsive stylesheet
    components/
      Navbar.jsx             Navigation, shared count, logout
      PokemonCard.jsx        Reusable card and create-bookmark form
      SearchBar.jsx          Controlled search field via props
      Spinner.jsx            Accessible loading message
    pages/
      LoginPage.jsx          Mock login form
      PokemonPage.jsx        API request, search, loading/error/retry
      BookmarksPage.jsx      Read, remove, and clear bookmarks
    contexts/
      AuthContext.jsx        Shared mock user and login/logout
      BookmarkContext.jsx    Shared reducer state and persistence
    reducers/
      bookmarkReducer.js     Pure add/remove/clear transitions
    utils/
      storage.js             Safe JSON reads/writes to localStorage
  tests/
    bookmarkReducer.test.js  Core bookmark behavior tests
```

## Features mapped to course concepts

The supplied brief lists concepts rather than individual lesson-number mappings, so this table uses those concept names.

| Feature | Concept | Where to read |
| --- | --- | --- |
| App assembled from functions | Functional components, JSX, composition | `main.jsx`, `App.jsx` |
| Reusable cards on two pages | Props and callback props | `PokemonCard.jsx` |
| Name and note forms | `useState`, controlled inputs, submit events, `preventDefault` | `LoginPage.jsx`, `PokemonCard.jsx` |
| Search input shared with parent | Lifting state up, controlled props | `SearchBar.jsx`, `PokemonPage.jsx` |
| Search results | Derived state, `filter`, string methods | `PokemonPage.jsx` |
| Catalogue and bookmark lists | `map`, stable React keys | Both collection pages |
| Loading, error, no matches, empty shelf | Conditional rendering | Both collection pages |
| Public API request | `useEffect`, async/await, fetch, HTTP status checks | `PokemonPage.jsx` |
| Cancel requests on navigation | Effect cleanup, AbortController | `PokemonPage.jsx` |
| Retry API request | Dependency array, functional state update | `PokemonPage.jsx` |
| Shared mock user | Context API, `useContext`, custom hook | `AuthContext.jsx` |
| Shared saved collection and count | Context API + `useReducer` | `BookmarkContext.jsx`, `Navbar.jsx` |
| Add/remove/clear bookmarks | Actions, pure reducers, immutable updates | `bookmarkReducer.js` |
| Restore and save browser data | Lazy initialization, side effects, JSON/localStorage | Both contexts and `storage.js` |
| Three routes and active links | React Router, `Routes`, `Route`, `Outlet`, `NavLink` | `App.jsx`, `Navbar.jsx` |
| Login/logout redirects | `useNavigate`, `Navigate` | Login, navigation, signed-in layout |
| Behavior checks | Automated unit tests and assertions | `tests/bookmarkReducer.test.js` |

### Follow one bookmark through the code

1. A keystroke updates `note` in `PokemonCard` with `setNote`.
2. Form submission calls the `onAdd` prop with Pokémon data and the note.
3. That prop points to Context's `addBookmark` helper.
4. The helper dispatches `{ type: 'ADD_BOOKMARK', payload: ... }`.
5. The reducer returns a new array; Context consumers render with the new state.
6. The provider's effect writes the array to localStorage.

Start reading `main.jsx` → `App.jsx` → the pages → `PokemonCard.jsx` → the contexts → the reducer. Comments explain concepts where they are used, rather than commenting every punctuation mark.

## Module 2 requirements and remaining submission work

| Brief requirement | Scaffold coverage |
| --- | --- |
| Vite, functional components, hooks, clean props | Included |
| At least two routes and navigation | Three pages: `/`, `/pokemon`, `/bookmarks` |
| Shared state, Context where useful | User Context; bookmark Context + reducer |
| Fetch/persist data, loading/error handling | PokéAPI, retry, localStorage and storage warnings |
| Controlled form to create an item | Card form creates a bookmark containing the selected Pokémon and note |
| Read and delete items | Saved collection, remove, clear |
| Public deployment URL | **To do by your team** |
| Team commits, branches/PRs, task tracking | **To do by your team** |
| README submission fields and presentation | Fill placeholders below; prepare slides and live demo |

Bonus features included: search, responsive styling, mock authentication, and a loading status. Reducer tests use Node, not React Testing Library; the specific React Testing Library bonus has not been implemented.

### Complete before submission

- Team members: **[Add names]**
- Work division: **[Add each member's actual contributions]**. Each member should touch state, a route, and data fetching or composition as required by the brief.
- GitHub repository: **[Add repository URL]**
- Public deployed URL: **[Add URL after deployment]**
- Screenshot or short recording: **[Add your working app screenshot/recording]**
- Project board/issues: **[Add task tracking link]**
- Slides: brief problem statement, stack/data source choices, screenshots, individual learnings, challenges, and live demo; target the brief's 10–15 minutes including demo.

For deployment, build with `npm run build` and publish `dist` on a suitable static host. Because this scaffold uses `BrowserRouter`, configure the host to serve `index.html` for app routes such as `/bookmarks`; otherwise refreshing a nested route can return 404. Check the host's current SPA routing instructions. Deployment is not performed by this scaffold.

### AI and tools disclosure (adapt to your actual usage)

ChatGPT/Codex helped scaffold this app, write concept comments and documentation, and check the build and reducer behavior. The team reviewed and adapted the code and should be able to explain each part. Add any other tools or tutorials used by your team. Pokémon data and sprites come from PokéAPI; this is an unofficial educational project.

## Manual verification checklist

Scaffold verification: production build and all four reducer tests passed. A browser smoke check with simulated PokéAPI responses passed route guards, login, note creation, refresh persistence, user isolation, remove/clear, search, and error/retry, with no JavaScript page errors. The smoke-check harness is not a project dependency or included test command; live PokéAPI availability was not validated by that check.

- Signed-out visits to `/pokemon` and `/bookmarks` redirect to login.
- Blank/space-only login is rejected; a valid name opens the catalogue.
- Search `PIKACHU`, `25`, and a nonexistent name; clear search to restore the list.
- Add a note and bookmark, switch pages, refresh, remove, and clear; check the count throughout.
- Log out, use a different name, then return to the first name; verify separate collections.
- To check API errors: use browser developer tools to block requests to `pokeapi.co`, navigate to the catalogue, and check the error. Unblock requests and press Retry.
- In browser storage tools, replace this app's saved bookmark JSON with invalid text and refresh; it should recover with an empty collection.
- Use keyboard navigation and a narrow browser window to check forms and layout.

## Reference documentation

- [Vite setup and Node requirements](https://vite.dev/guide/)
- [React: managing state](https://react.dev/learn/managing-state)
- [React: reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context)
- [React Router declarative setup](https://reactrouter.com/start/declarative/installation)
- [PokéAPI REST documentation](https://pokeapi.co/docs/v2)

Requirements source: the supplied `module2-project-brief.pdf`. No synced reference files were modified.
