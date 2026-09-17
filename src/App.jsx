import { Navigate, Outlet, Route, Routes } from 'react-router';
import { useAuth } from './contexts/AuthContext';
import { BookmarkProvider } from './contexts/BookmarkContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import PokemonPage from './pages/PokemonPage';
import BookmarksPage from './pages/BookmarksPage';

function SignedInLayout() {
  const { user } = useAuth();
  // Conditional rendering: signed-out visitors return to the mock login.
  // This is a UI guard only, not real authorization or a security boundary.
  if (!user) return <Navigate to="/" replace />;

  return (
    // A different user key remounts the provider with that user's saved bookmarks.
    <BookmarkProvider key={user.username} username={user.username}>
      <Navbar />
      {/* Outlet renders the matched child page inside our shared layout. */}
      <main className="container"><Outlet /></main>
    </BookmarkProvider>
  );
}

export default function App() {
  // Client-side routing changes the page without a full browser reload.
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<SignedInLayout />}>
        <Route path="/pokemon" element={<PokemonPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
      </Route>
      {/* Unknown URLs return to the entry page; replace avoids a back-button loop. */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
