import { createContext, useContext, useEffect, useState } from 'react';
import { readStorage, writeStorage } from '../utils/storage';

const AuthContext = createContext(null);
const USER_KEY = 'pokeshelf:user';

export function AuthProvider({ children }) {
  // Lazy initialization reads storage once on mount, rather than on every render.
  const [user, setUser] = useState(() => {
    const saved = readStorage(USER_KEY, null);
    return typeof saved?.username === 'string' && saved.username.trim()
      ? { username: saved.username.trim().toLowerCase() } : null;
  });
  const [storageError, setStorageError] = useState(false);

  // Side effect: synchronize the current user after React commits a state change.
  useEffect(() => {
    setStorageError(!writeStorage(USER_KEY, user));
  }, [user]);

  function login(username) {
    // Mock login accepts a display name. No password or backend is involved.
    setUser({ username: username.trim().toLowerCase() });
  }

  function logout() { setUser(null); }

  // Context shares user and actions without passing props through every level.
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {storageError && <p role="alert" className="notice">Login changes cannot be saved in this browser.</p>}
      {children}
    </AuthContext.Provider>
  );
}

// A custom hook gives components a readable way to consume this Context.
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be inside AuthProvider');
  return context;
}
