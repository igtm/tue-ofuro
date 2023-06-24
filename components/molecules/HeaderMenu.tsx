import { useRouter } from "next/router";
import { useCallback, useEffect, useState, FC, ComponentType } from "react";
import ReactModal from "react-modal";
import { HeaderMenuNavLink } from "../atoms/HeaderMenuNavLink";
import { ThemeToggle } from "../atoms/ThemeToggle";
const ModalSafeForReact18 = ReactModal as ComponentType<ReactModal['props']>;

export const HeaderMenu: FC = () => {
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="hsl(var(--bc))"
          width="18px"
          height="18px"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      </button>

      <ModalSafeForReact18
        isOpen={isOpen}
        onRequestClose={handleClose}
        bodyOpenClassName="overflow-hidden"
        style={{
          content: {
            backgroundColor: "hsl(var(--b2))",
            color: "hsl(var(--bc))",
          },
        }}
      >
        <nav className="pt-8 grid gap-y-2">
          <ThemeToggle />
          <HeaderMenuNavLink href="/">ポッドキャスト</HeaderMenuNavLink>
          <HeaderMenuNavLink href="/blog">ブログ</HeaderMenuNavLink>
          <HeaderMenuNavLink href="/fortune-telling">占い</HeaderMenuNavLink>
          <HeaderMenuNavLink href="/game">ゲーム</HeaderMenuNavLink>
          <HeaderMenuNavLink href="/showcase">ShowCase</HeaderMenuNavLink>
        </nav>
        <div className="absolute top-0 right-0 z-10">
          <button className="p-4" onClick={handleClose}>
            <img src="/close-black-18dp.svg" alt="閉じる" />
          </button>
        </div>
      </ModalSafeForReact18>
    </>
  );
};
