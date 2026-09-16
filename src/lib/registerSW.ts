/**
 * Registers the service worker in production only.
 *
 * In dev a worker would serve stale modules and make edits look like they had
 * no effect, so registration is skipped and any previously installed worker is
 * unregistered to keep a developer's browser honest.
 */
export function registerServiceWorker(): void {
  if (!('serviceWorker' in navigator)) return;

  if (import.meta.env.DEV) {
    void navigator.serviceWorker
      .getRegistrations()
      .then((regs) => regs.forEach((r) => void r.unregister()))
      .catch(() => undefined);
    return;
  }

  window.addEventListener('load', () => {
    void navigator.serviceWorker.register('/sw.js').catch(() => {
      // A failed registration costs offline support, not the app. Nothing to
      // show the student.
    });
  });
}
