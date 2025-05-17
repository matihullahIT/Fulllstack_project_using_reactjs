import { navbarSection } from "../constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";


const Navbar = () => {
  const [toggler, settoggler] = useState(false);
  return (
    <div className="w-auto py-3 flex items-center md:items-center lg:items-center justify-between text-black">
      <div className="w-full">
        {navbarSection.map((item, index) => (
          index === 0 ?
            <a
              key={item.id}
              className={`text-xl relative transition-all after:content-[''] after:absolute after:left-0 after:-bottom-1
             after:h-[2px] after:w-0 after:transition-all
              after:duration-300 after:bg-yellow-400  text-yellow-400`}
              href={item.link}
              id={item.id}
            >
              {item.text}
            </a>
            : ""
        ))}
      </div>
      <div>
        <button onClick={() => settoggler(!toggler)} className="block lg:hidden md:hidden text-3xl font-bold rounded-md transition-all ease-in-out hover:bg-gray-400 px-3 py-2 hover:text-white hover:bg-backdrop-blur-lg">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <div
        id="menu"
        className={`
          absolute
          ${toggler ? "block" : "hidden"}
          top-15 flex flex-col gap-5 w-screen py-4 right-3 bg-yellow-400 text-white
          md:static md:flex md:flex-row md:gap-5 md:w-auto md:py-0 md:bg-transparent md:text-black 
          lg:static lg:flex lg:flex-row lg:gap-5 lg:w-auto lg:py-0 lg:bg-none lg:text-black 
          xl:static xl:flex xl:flex-row xl:gap-5 xl:w-auto xl:py-0 xl:bg-none xl:text-black 
          justify-between
        `}
      >
        {navbarSection.map((item, index) => (
          index !== 0 ?
            <a
              key={item.id}
              className={`text-xl relative transition-all after:content-[''] after:absolute after:left-0 after:-bottom-1
             after:h-[2px] after:w-0 after:transition-all
              after:duration-300 after:bg-yellow-400  hover:after:w-full px-7`}
              href={item.link}
              id={item.id}
            >
              {item.text}
            </a>
            : ""
        ))}
      </div>
    </div>
  );
};
export default Navbar;
