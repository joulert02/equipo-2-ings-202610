import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/authStore.js";

/**
 * Es verdadero una vez que la persistencia de zustand ha terminado de rehidratarse desde el almacenamiento.
 * Las decisiones de auth (redirecciones, chequeos de token) deben esperar a esto para evitar
 * leer null antes de que el localStorage se haya fusionado con la tienda.
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
