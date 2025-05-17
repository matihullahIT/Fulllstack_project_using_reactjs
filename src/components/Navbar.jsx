import { navbarSection } from "../constants";
const Navbar = () => {
  return (
    <div className="w-full py-3 flex text-black">
      {navbarSection.map((item, index) => (
        <div
          className={`relative lg:w-screen md:w-auto sm:w-auto flex lg:flex md:flex sm:flex-col justify-between
          ${index === 0 ? "left-0 top-0 items-baseline " : "right-0 top-0 items-end p-0 m-0"}`}
          key={index}
        >
          <a
            href={item.link}
            className={`text-xl relative transition-all after:content-[''] after:absolute after:left-0 after:-bottom-1
             after:h-[2px] after:w-0 after:transition-all
              after:duration-300 after:bg-yellow-400  ${index===0?" text-yellow-400":"hover:after:w-full"}`}
            id={item.id}
          >
            {item.text}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
