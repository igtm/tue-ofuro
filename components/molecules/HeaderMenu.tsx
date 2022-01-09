import { useRouter } from "next/router";
import { useCallback, useEffect, useState, VFC } from "react";
import ReactModal from "react-modal";
import { HeaderMenuNavLink } from "../atoms/HeaderMenuNavLink";

export const HeaderMenu: VFC = () => {
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
      </ReactModal>
    </>
  );
};
