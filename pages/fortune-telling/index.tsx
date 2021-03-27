import Link from "next/link";
import { PageTitle } from "../../components/atoms/PageTitle";

export default function Page() {
  return (
    <main className="grid gap-y-12">
      <PageTitle>占い</PageTitle>

      <ul className="grid grid-cols-3 gap-2 px-2">
        <li>
          <Link href="/fortune-telling/numerology">
            <a className="block aspect-w-1 aspect-h-1">
              <div className="border-2 border-gray-300 rounded bg-gray-50 grid place-items-center">
                <span className="text-lg text-center font-bold text-gray-900">数秘術</span>
              </div>
            </a>
          </Link>
        </li>

        <li>
          <div className="block aspect-w-1 aspect-h-1">
            <div className="border-2 border-gray-300 rounded bg-gray-50 grid place-items-center">
              <span className="text-lg text-center font-bold text-gray-900">
                Coming Soon
              </span>
            </div>
          </div>
        </li>

        <li>
          <div className="block aspect-w-1 aspect-h-1">
            <div className="border-2 border-gray-300 rounded bg-gray-50 grid place-items-center">
              <span className="text-lg text-center font-bold text-gray-900">
                Coming Soon
              </span>
            </div>
          </div>
        </li>
      </ul>
    </main>
  );
}
