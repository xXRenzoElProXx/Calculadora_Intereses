import { useEffect, useState } from "react";

/**
 * Returns a value that only updates after `delay` ms of no changes.
 * Used to avoid rebuilding the chart / results on every single keystroke.
 */
export function useDebouncedValue<T>(value: T, delay = 220): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
