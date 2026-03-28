import { FormEvent, useEffect, useState, VFC } from "react";
import { useRouter } from "next/router";

export const HeaderSearch: VFC = () => {
  const router = useRouter();
  const queryValue =
    typeof router.query.q === "string" ? router.query.q : "";
  const [keyword, setKeyword] = useState(queryValue);

  useEffect(() => {
    setKeyword(queryValue);
  }, [queryValue]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedKeyword = keyword.trim();

    if (trimmedKeyword.length === 0) {
      router.push("/transcripts");
      return;
    }

    router.push(`/transcripts?q=${encodeURIComponent(trimmedKeyword)}`);
  };

  return (
    <form
      className="flex items-center gap-2 w-full md:w-auto"
      onSubmit={handleSubmit}
      role="search"
      aria-label="書き起こし検索"
    >
      <label className="input input-bordered flex items-center gap-2 w-full md:w-80 bg-base-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 opacity-60"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3a7.5 7.5 0 1 0 4.68 13.36l4.23 4.23 1.06-1.06-4.23-4.23A7.5 7.5 0 0 0 10.5 3ZM4.5 10.5a6 6 0 1 1 12 0 6 6 0 0 1-12 0Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="search"
          className="grow"
          placeholder="書き起こしを検索"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
      </label>
      <button className="btn btn-primary btn-sm text-white" type="submit">
        検索
      </button>
    </form>
  );
};
