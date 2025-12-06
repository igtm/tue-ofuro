import { FC, useEffect, useState } from "react";

export const ThemeToggle: FC = () => {
  const [theme, setTheme] = useState(
    globalThis.localStorage && globalThis.localStorage.theme
  );

  useEffect(() => {
    setTheme(globalThis.localStorage && globalThis.localStorage.theme);
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("");
      globalThis.localStorage.theme = "";
      document.documentElement.dataset.theme = "light";
    } else {
      setTheme("dark");
      globalThis.localStorage.theme = "dark";
      document.documentElement.dataset.theme = "dark";
    }
  };
  return (
    <label className="cursor-pointer relative inline-flex items-center">
      <input
        type="checkbox"
        className="toggle theme-controller bg-base-content hover:bg-base-content/90 border-base-content"
        checked={theme === "dark"}
        onChange={toggleTheme}
        aria-label="dark mode switch"
      />
      {/* Sun Icon (Light Mode) - Visible on Left when Dark (Knob is Right) */}
      <svg
        className={`absolute left-1.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content fill-current pointer-events-none transition-opacity duration-200 ease-in-out ${
          theme === "dark" ? "opacity-100" : "opacity-0"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2" />
          <path d="M12 21v2" />
          <path d="M4.22 4.22l1.42 1.42" />
          <path d="M18.36 18.36l1.42 1.42" />
          <path d="M1 12h2" />
          <path d="M21 12h2" />
          <path d="M4.22 19.78l1.42-1.42" />
          <path d="M18.36 5.64l1.42-1.42" />
        </g>
      </svg>
      {/* Moon Icon (Dark Mode) - Visible on Right when Light (Knob is Left) */}
      <svg
        className={`absolute right-1.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content fill-current pointer-events-none transition-opacity duration-200 ease-in-out ${
          theme === "dark" ? "opacity-0" : "opacity-100"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </g>
      </svg>
    </label>
  );
};
