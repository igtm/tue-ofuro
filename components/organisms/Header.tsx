import { FC, useState, useEffect } from "react";
import { HeaderLogo } from "../molecules/HeaderLogo";
import { HeaderMenu } from "../molecules/HeaderMenu";
import { HeaderNav } from "../molecules/HeaderNav";

export const Header: FC = () => {
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
      document.documentElement.classList.remove("dark");
    } else {
      setTheme("dark");
      globalThis.localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    }
  };
  return (
    <header className="flex flex-wrap items-center justify-between shadow bg-base-100">
      <HeaderLogo />

      <div className="hidden md:block">
        <HeaderNav />
      </div>

      <div className="block md:hidden">
        <HeaderMenu />
      </div>
    </header>
  );
};
