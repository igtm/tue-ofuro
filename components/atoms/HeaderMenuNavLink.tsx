import Link from "next/link";
import { VFC } from "react";

type Props = {
  children: React.ReactNode;
  href: string;
};

export const HeaderMenuNavLink: VFC<Props> = ({ children, href }) => (
  <Link href={href} className="p-2 text-lg text-primary-800">
    {children}
  </Link>
);
