import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState, VFC } from "react";
import ReactModal from "react-modal";

export const Header: VFC = () => {
  return (
    <header className="flex flex-wrap items-center justify-between bg-white shadow">
      <Logo />

      <div className="hidden md:block">
        <Nav />
      </div>

      <div className="block md:hidden">
        <Menu />
      </div>
    </header>
  );
};

const Logo: VFC = () => (
  <Link href="/">
    <a className="block py-4 px-4 md:px-6 w-48 md:w-60">
      <img src="/icon.svg" alt="火曜日のおフロ" />
    </a>
  </Link>
);

type NavLinkProps = {
  href: string;
};

const AppBarNavLink: FC<NavLinkProps> = (props) => (
  <Link href={props.href}>
    <a className="py-4 px-4 md:px-6 text-gray-500 hover:text-gray-800 transition-all duration-100">
      {props.children}
    </a>
  </Link>
);

const Nav: VFC = () => (
  <nav className="flex flex-nowrap justify-between items-center">
    <AppBarNavLink href="/podcast">ポッドキャスト</AppBarNavLink>
    <AppBarNavLink href="/blog">ブログ</AppBarNavLink>
    <AppBarNavLink href="/fortune-telling">占い</AppBarNavLink>
    <AppBarNavLink href="/game">ゲーム</AppBarNavLink>
  </nav>
);

const MenuNavLink: FC<NavLinkProps> = (props) => (
  <Link href={props.href}>
    <a className="p-2 text-gray-800">{props.children}</a>
  </Link>
);

const Menu: VFC = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    router.events.on("routeChangeComplete", handleClose);

    return () => {
      router.events.off("routeChangeComplete", handleClose);
    };
  }, [handleClose, router.events]);

  return (
    <>
      <button className="py-4 px-4" onClick={handleOpen}>
        <img src="/menu-black-18dp.svg" alt="メニュー" />
      </button>

      <ReactModal
        isOpen={isOpen}
        onRequestClose={handleClose}
        bodyOpenClassName="overflow-hidden"
      >
        <nav className="pt-8 grid gap-y-2">
          <MenuNavLink href="/podcast">ポッドキャスト</MenuNavLink>
          <MenuNavLink href="/blog">ブログ</MenuNavLink>
          <MenuNavLink href="/fortune-telling">占い</MenuNavLink>
          <MenuNavLink href="/game">ゲーム</MenuNavLink>
        </nav>

        <div className="absolute top-0 right-0 z-10">
          <button className="p-4" onClick={handleClose}>
            <img src="/close-black-18dp.svg" alt="閉じる" />
          </button>
        </div>
      </ReactModal>
    </>
  );
};
