/**
 * Namespaced localStorage with defensive access.
 *
 * Reads can throw or return null in a private window, with site data blocked,
 * or during a thumbnail capture. Every accessor here is total: it returns the
 * fallback rather than throwing, so a storage failure degrades the app to
 * "nothing saved yet" instead of a white screen.
 */
const NS = 'liblearn';

const key = (k: string) => `${NS}:${k}`;

export function readJSON<T>(k: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key(k));
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON(k: string, value: unknown): boolean {
  try {
    localStorage.setItem(key(k), JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function remove(k: string): void {
  try {
    localStorage.removeItem(key(k));
  } catch {
    /* nothing to do - the value was never persisted */
  }
}

export function clearAll(): void {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(`${NS}:`))
      .forEach((k) => localStorage.removeItem(k));
  } catch {
    /* ignore */
  }
}
