import { createContext, useCallback, useContext, useMemo } from "react";

const UIContext = createContext(null);
export const useUI = () => useContext(UIContext);

export function UIProvider({ children }) {
  const goTo = useCallback((id) => {
    const target = document.getElementById(id);
    if (!target) {
      window.location.href = `/index.html#${encodeURIComponent(id)}`;
      return;
    }
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  }, []);
  const value = useMemo(() => ({ goTo }), [goTo]);
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
