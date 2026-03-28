import { FC } from "react";
import Link from "next/link";
import { HeaderNavLink } from "../atoms/HeaderNavLink";
import { ThemeToggle } from "../atoms/ThemeToggle";

export const HeaderNav: FC = () => (
  <nav className="flex flex-nowrap justify-between items-center gap-4">
    <Link
      href="/"
      className="btn bg-orange-200 hover:bg-orange-300 text-black btn-sm rounded-full font-bold shadow-md hover:scale-105 transition-transform no-underline border-none"
    >
      ポッドキャスト
    </Link>
    <HeaderNavLink href="/transcripts">書き起こし</HeaderNavLink>
    <HeaderNavLink href="/blog">ブログ</HeaderNavLink>
    <HeaderNavLink href="/fortune-telling">占い</HeaderNavLink>
    <HeaderNavLink href="/game">ゲーム</HeaderNavLink>
    <HeaderNavLink href="/showcase">ShowCase</HeaderNavLink>
    <ThemeToggle />
  </nav>
);
