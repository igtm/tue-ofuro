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
    <button onClick={toggleTheme} aria-label="dark mode switch">
      <img width={20} src={theme === "dark" ? "/sun.svg" : "/moon.svg"} />
    </button>
  );
};
