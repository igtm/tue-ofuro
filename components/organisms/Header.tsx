import { VFC } from "react";
import { HeaderLogo } from "../molecules/HeaderLogo";
import { HeaderMenu } from "../molecules/HeaderMenu";
import { HeaderNav } from "../molecules/HeaderNav";

export const Header: VFC = () => {
  return (
    <header className="flex flex-wrap items-center justify-between bg-white shadow">
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
