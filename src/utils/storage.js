// localStorage stores strings, so objects must be encoded/decoded as JSON.
// A browser can block storage, and users can manually corrupt stored JSON.
export function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    // The UI can keep working in memory and warn that changes will not persist.
    return false;
  }
}
