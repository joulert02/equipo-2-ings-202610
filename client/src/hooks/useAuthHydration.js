import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/authStore.js";

/**
 * True once zustand persist has finished rehydrating from storage.
 * Auth decisions (redirects, token checks) should wait for this to avoid
 * reading null before localStorage has been merged into the store.
 */
export function useAuthHydration() {
  const [hydrated, setHydrated] = useState(() => useAuthStore.persist.hasHydrated());

  useEffect(() => {
    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
      return undefined;
    }
    const unsub = useAuthStore.persist.onFinishHydration(() => setHydrated(true));
    return unsub;
  }, []);

  return hydrated;
}
