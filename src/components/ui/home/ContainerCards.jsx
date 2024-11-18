import "../../../index.css";

import { CardLocation } from "../../cards/CardLocation";
import propTypes from "prop-types";

export function ContainerCards({ setIsOpen, data }) {
  return (
    <>
      {data.length === 0 ? (
        <section className=" dark:bg-[#2a2a2a]">
          <div className="py-8 px-4 mx-auto w-[70vw] h-[80vh] lg:py-16 lg:px-6">
            <div className="mx-auto  text-center">
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                No hay resultados.
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                Sorry, we can't find that page. You'll find lots to explore on
                the home page.{" "}
              </p>
              
            </div>
          </div>
        </section>
      ) : (
        <div className="grid mb-[4rem] md:mb-4 md:grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 overflow-x-hidden transition-all duration-500 ">
          {data.map((item) => (
            <CardLocation
              key={item.id}
              image={item.image}
              name={item.name}
              city={item.canton_id}
              starts="4.2"
              setIsOpen={setIsOpen}
              id={item.id}
            />
          ))}
        </div>
      )}
    </>
  );
}

ContainerCards.propTypes = {
  setIsOpen: propTypes.func,
  data: propTypes.array,
};
