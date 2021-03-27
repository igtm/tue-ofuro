import { useCallback, useMemo, useState, VFC } from "react";
import ReactModal from "react-modal";
import { CabalaNumber } from "../models/typeCabalaNumber";
import { ModernNumber } from "../models/typeModernNumber";

type Props = {
  numberType: string;
  numberTypeDescription: string;
  number?: ModernNumber | CabalaNumber;
  numberDescription?: string;
};

export const NumberCard: VFC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const hasNumber = useMemo(() => {
    return props.number != null;
  }, [props.number]);

  const numberString = useMemo(() => {
    return props.number != null ? `${props.number}` : "-";
  }, [props.number]);

  return (
    <>
      <div
        className="aspect-w-1 aspect-h-1"
        onClick={handleOpen}
        onKeyPress={handleOpen}
        role="button"
        tabIndex={0}
      >
        <section className="border-2 border-gray-300 rounded pb-2 bg-gray-50 grid gap-2 content-center">
          <h1 className="grid place-content-center text-base text-gray-800">
            {props.numberType}
          </h1>

          <p className="grid place-content-center text-4xl font-bold text-gray-900">
            {numberString}
          </p>
        </section>
      </div>

      <ReactModal
        isOpen={isOpen}
        onRequestClose={handleClose}
        bodyOpenClassName="overflow-hidden"
      >
        <div className="absolute top-0 right-0 z-10">
          <button className="p-4" onClick={handleClose}>
            <img src="/close-black-18dp.svg" alt="閉じる" />
          </button>
        </div>

        <div className="relative h-full grid place-items-center">
          <section className="grid place-items-center">
            <h1 className="text-5xl font-bold text-gray-800">
              {props.numberType}
            </h1>

            <p className="mt-8 text-base text-gray-900">
              {props.numberTypeDescription}
            </p>

            {hasNumber ? (
              <>
                <h2 className="mt-16 text-5xl font-bold text-gray-800">
                  {numberString}
                </h2>

                <p className="mt-8 text-base text-gray-900">
                  {props.numberDescription}
                </p>
              </>
            ) : null}
          </section>
        </div>
      </ReactModal>
    </>
  );
};
