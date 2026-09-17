import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useBookmarks } from '../contexts/BookmarkContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { bookmarks } = useBookmarks();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    // Programmatic navigation follows the logout event.
    navigate('/', { replace: true });
  }
  return (
    <header className="header">
      <strong>PokéShelf</strong>
      <nav aria-label="Main navigation">
        {/* NavLink adds an active class and aria-current to the selected route. */}
        <NavLink to="/pokemon">Catalogue</NavLink>
        <NavLink to="/bookmarks">My bookmarks ({bookmarks.length})</NavLink>
      </nav>
      <span>Hi, {user.username}</span>
      <button className="secondary" onClick={handleLogout}>Log out</button>
    </header>
  );
}
