import Link from "next/link";
import { VFC } from "react";

type Props = {
  children: React.ReactNode;
  href: string;
};

export const HeaderNavLink: VFC<Props> = ({ children, href }) => (
  (<Link
    href={href}
    className="py-4 px-4 md:px-6 text-gray-500 hover:text-gray-800 transition-all duration-100">

    {children}

  </Link>)
);
