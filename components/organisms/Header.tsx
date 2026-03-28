import { FC } from "react";
import { HeaderLogo } from "../molecules/HeaderLogo";
import { HeaderMenu } from "../molecules/HeaderMenu";
import { HeaderNav } from "../molecules/HeaderNav";
import { HeaderSearch } from "../molecules/HeaderSearch";

export const Header: FC = () => {
  return (
    <header className="shadow bg-base-100 px-4 py-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <HeaderLogo />

        <div className="hidden md:flex md:items-center md:gap-4">
          <HeaderSearch />
          <HeaderNav />
        </div>

        <div className="block md:hidden">
          <HeaderMenu />
        </div>
      </div>

      <div className="md:hidden pb-2">
        <HeaderSearch />
      </div>
    </header>
  );
};
