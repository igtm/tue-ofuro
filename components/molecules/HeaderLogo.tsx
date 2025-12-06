import Link from "next/link";
import { VFC } from "react";

export const HeaderLogo: VFC = () => (
  <Link href="/" className="block py-4 px-4 md:px-6 w-48 md:w-60">
    <span className="font-bold text-xl tracking-tight text-base-content">
      火曜日のおフロ
    </span>
  </Link>
);
