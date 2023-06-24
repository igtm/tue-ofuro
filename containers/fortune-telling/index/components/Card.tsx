import { VFC } from "react";

type Props = {
  children: React.ReactNode;
};

export const Card: VFC<Props> = ({ children }) => {
  return (
    <div className="block aspect-w-1 aspect-h-1">
      <div className="border-2 border-gray-300 rounded bg-base-50 grid place-items-center hover:bg-base-200">
        <span className="text-lg text-center font-bold text-primary-900">
          {children}
        </span>
      </div>
    </div>
  );
};
