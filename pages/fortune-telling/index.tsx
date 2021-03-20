import Link from "next/link";

export default function Page() {
  return (
    <div>
      fortune-telling
      <br />
      <Link href="/fortune-telling/numerology">
        <a>numerology</a>
      </Link>
    </div>
  );
}
