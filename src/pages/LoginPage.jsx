import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { user, login } = useAuth();
  const navigate = useNavigate();
  // Hooks run before any conditional return, following the Rules of Hooks.
  if (user) return <Navigate to="/pokemon" replace />;

  function handleSubmit(event) {
    event.preventDefault();
    if (!username.trim()) {
      setError('Please enter a name, not just spaces.');
      return;
    }
    login(username);
    navigate('/pokemon', { replace: true });
  }

  return (
    <main className="login card">
      <p className="eyebrow">YOUR LITTLE POKÉMON COLLECTION</p>
      <h1>PokéShelf</h1>
      <p>Discover Pokémon and save your favourites.</p>
      <p className="muted">Demo login: choose any name. No password needed. This is not a real account.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Your name</label>
        <input id="username" value={username} required maxLength={30} autoComplete="username"
          onChange={(event) => { setUsername(event.target.value); setError(''); }} />
        {error && <p role="alert">{error}</p>}
        <button type="submit">Explore Pokémon</button>
      </form>
    </main>
  );
}
