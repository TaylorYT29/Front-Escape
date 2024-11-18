import "../../index.css";
import useScrollPosition from "../hooks/useScrollPosition.js";
import propTypes from "prop-types";
import { DrawerMenu } from "./DrawerMenu.jsx";

export function CategorieNav({ setIsFilter }) {
  const isVisible = useScrollPosition();

  return (
    <div
      id="navbar"
      className="fixed w-full   dark:bg-[#2a2a2a] z-10 transition-all duration-500"
      style={{
        top: isVisible ? "0" : "-80px",
      }}
    >

      <div className="my-4 flex justify-between mr-8">
        <h1 className="font-black dark:text-white text-3xl lg:text-4xl ">
          ESCAPE
        </h1>
        <div className="flex gap-4">
          <DrawerMenu positionX="right-14" positionY="mt-1" />

          <svg
            className="w-8 h-8  text-black dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            onClick={() => setIsFilter(true)}

          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M5 7h14M5 12h14M5 17h10"
            />
          </svg>
        </div>

      </div>
    </div>
  );
}

CategorieNav.propTypes = {
  setIsFilter: propTypes.func.isRequired,
};