import { VFC } from "react";
import { CabalaNumber } from "../../containers/fortune-telling/numerology/typeCabalaNumber";
import { ModernNumber } from "../../containers/fortune-telling/numerology/typeModernNumber";

type Props = {
  title: string;
  number?: ModernNumber | CabalaNumber;
};

export const NumberCard: VFC<Props> = (props) => {
  return (
    <div className="aspect-w-1 aspect-h-1">
      <section className="border-2 border-gray-300 rounded pb-2 bg-gray-50 grid gap-2 content-center">
        <h1 className="grid place-content-center text-base text-gray-800">
          {props.title}
        </h1>

        <p className="grid place-content-center text-4xl font-bold text-gray-900">
          {props.number ?? "-"}
        </p>
      </section>
    </div>
  );
};
