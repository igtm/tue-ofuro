import { VFC } from "react";
import { HeaderNavLink } from "../atoms/HeaderNavLink";

export const HeaderNav: VFC = () => (
  <nav className="flex flex-nowrap justify-between items-center">
    <HeaderNavLink href="/">ポッドキャスト</HeaderNavLink>
    <HeaderNavLink href="/blog">ブログ</HeaderNavLink>
    <HeaderNavLink href="/fortune-telling">占い</HeaderNavLink>
    <HeaderNavLink href="/game">ゲーム</HeaderNavLink>
    <HeaderNavLink href="/showcase">ShowCase</HeaderNavLink>
  </nav>
);
