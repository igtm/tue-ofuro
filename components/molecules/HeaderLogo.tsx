import Link from "next/link";
import { VFC } from "react";

export const HeaderLogo: VFC = () => (
  <Link href="/" className="block py-4 px-4 md:px-6 w-48 md:w-60">
    <img src="/icon.svg" alt="火曜日のおフロ" />
  </Link>
);
