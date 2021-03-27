import Link from "next/link";
import { FC, VFC } from "react";

export const Header: VFC = () => {
  return (
    <header className="flex flex-wrap items-center justify-between bg-white shadow">
      <Logo />
      <Nav />
    </header>
  );
};

const Logo: VFC = () => (
  <Link href="/">
    <a className="block py-4 px-6 w-60">
      <img src="/icon.svg" alt="火曜日のおフロ" />
    </a>
  </Link>
);

type NavLinkProps = {
  href: string;
};

const NavLink: FC<NavLinkProps> = (props) => (
  <Link href={props.href}>
    <a className="py-4 px-6 text-gray-500 hover:text-gray-800 transition-all duration-100">
      {props.children}
    </a>
  </Link>
);

const Nav: VFC = () => (
  <nav className="flex flex-nowrap justify-between items-center">
    <NavLink href="/podcast">ポッドキャスト</NavLink>
    <NavLink href="/blog">ブログ</NavLink>
    <NavLink href="/fortune-telling">占い</NavLink>
    <NavLink href="/game">ゲーム</NavLink>
  </nav>
);
