import { useEffect, useRef, useState } from "react";

const storageKey = "portfolio-theme";

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#0c0d0e" : "#f5f4ed");
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  const explicitChoice = useRef(false);

  useEffect(() => {
    const system = window.matchMedia("(prefers-color-scheme: dark)");
    let saved;
    try {
      saved = window.localStorage.getItem(storageKey);
    } catch {
      // The current tab can still change themes when browser storage is unavailable.
    }
    explicitChoice.current = saved === "light" || saved === "dark";
    const initial = explicitChoice.current
      ? saved
      : system.matches
        ? "dark"
        : "light";
    setTheme(initial);
    applyTheme(initial);

    function followSystem(event) {
      if (!explicitChoice.current) {
        const next = event.matches ? "dark" : "light";
        setTheme(next);
        applyTheme(next);
      }
    }
    function syncTabs(event) {
      if (event.key !== storageKey && event.key !== null) return;
      explicitChoice.current =
        event.newValue === "light" || event.newValue === "dark";
      const next = explicitChoice.current
        ? event.newValue
        : system.matches
          ? "dark"
          : "light";
      setTheme(next);
      applyTheme(next);
    }
    system.addEventListener("change", followSystem);
    window.addEventListener("storage", syncTabs);
    return () => {
      system.removeEventListener("change", followSystem);
      window.removeEventListener("storage", syncTabs);
    };
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    explicitChoice.current = true;
    setTheme(next);
    applyTheme(next);
    try {
      window.localStorage.setItem(storageKey, next);
    } catch {
      // Keep the chosen theme active for this tab.
    }
  }

  const label =
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={theme === "dark"}
      title={label}
    >
      <span className="theme-toggle-thumb" aria-hidden="true" />
      <span className="theme-sun" aria-hidden="true">
        ☀
      </span>
      <span className="theme-moon" aria-hidden="true">
        ☾
      </span>
    </button>
  );
}
