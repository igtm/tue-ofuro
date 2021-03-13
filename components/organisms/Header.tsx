import { FC } from "react";
import Link from "next/link";

const Logo = () => (
  <Link href="/">
    <a className="block py-4 px-6 w-60">
      <img src="/icon.svg" />
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

const Nav = () => (
  <nav className="flex flex-nowrap justify-between items-center">
    <NavLink href="/podcast">ポッドキャスト</NavLink>
    <NavLink href="/blog">ブログ</NavLink>
    <NavLink href="/fortune-telling">占い</NavLink>
    <NavLink href="/game">ゲーム</NavLink>
  </nav>
);

export const Header = () => {
  return (
    <header className="sticky top-0 flex flex-wrap items-center justify-between bg-white shadow">
      <Logo />
      <Nav />
    </header>
  );
};
