import Link from "next/link";
import React from "react";
import "tailwindcss/tailwind.css";

export default function Page() {
  return (
    <div>
      <Link href={`/podcast`}>
        <a>Podcast</a>
      </Link>
    </div>
  );
}
