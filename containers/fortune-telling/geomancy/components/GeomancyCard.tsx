import { useCallback, useMemo, useState, VFC } from "react";
import ReactModal from "react-modal";
import { GeomancySymbol } from "../models/typeGeomancySymbol";

type Props = {
  geomancySymbol?: GeomancySymbol;
  geomancySymbolDescription?: string;
};

export const GeomancyCard: VFC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const hasGeomancySymbol = useMemo(() => {
    return props.geomancySymbol != null;
  }, [props.geomancySymbol]);

  const geomancySymbolString = useMemo(() => {
    return props.geomancySymbol != null ? `${props.geomancySymbol}` : "-";
  }, [props.geomancySymbol]);

  return (
    <>
      <div
        className="aspect-w-1 aspect-h-1"
        onClick={handleOpen}
        onKeyPress={handleOpen}
        role="button"
        tabIndex={0}
      >
        <div className="border-2 border-gray-300 rounded bg-gray-50 grid gap-2 content-center hover:bg-gray-200">
          <p className="grid place-content-center text-center text-4xl font-bold text-gray-900">
            {geomancySymbolString}
          </p>
        </div>
      </div>

      <ReactModal
        isOpen={isOpen}
        onRequestClose={handleClose}
        bodyOpenClassName="overflow-hidden"
      >
        <div className="h-full pt-8 grid place-items-center">
          <section className="grid place-items-center">
            {hasGeomancySymbol ? (
              <>
                <h1 className="mt-16 text-5xl font-bold text-gray-800">
                  {geomancySymbolString}
                </h1>

                <p className="mt-8 text-base text-gray-900">
                  {props.geomancySymbolDescription}
                </p>
              </>
            ) : null}
          </section>
        </div>

        <div className="absolute top-0 right-0 z-10">
          <button className="p-4" onClick={handleClose}>
            <img src="/close-black-18dp.svg" alt="閉じる" />
          </button>
        </div>
      </ReactModal>
    </>
  );
};
