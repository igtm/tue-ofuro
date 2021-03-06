import Link from "next/link";
import { VFC } from "react";

type Props = {
  children: React.ReactNode;
  href: string;
};

export const HeaderMenuNavLink: VFC<Props> = ({ children, href }) => (
  <Link href={href}>
    <a className="p-2 text-gray-800">{children}</a>
  </Link>
);
