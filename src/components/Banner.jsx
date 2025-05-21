import { bannerSection } from "../constants"
const btn= bannerSection.btn
const Banner = () => {
  return (
    <div className=" flex  
    md:flex-row
     lg:flex-row
      relative -z-10 items-center justify-center h-screen borde-2">
        <div className=" absolute 
        md:relative 
        lg:relative 
        h-screen w-auto flex flex-col  px-9   justify-center">
          <h1  className="text-yellow-500  text-xl">{bannerSection.text}</h1>
          <h2 className="font-bold playfair text-6xl">Hello, my name<br/>  is Madelyn Torff</h2>
          <p>{bannerSection.details}</p>
          <div className=" flex gap-4">
            {btn.map((item, index) => (
              <button
                key={index}
                className={`border-1 px-5 py-4 my-5 border-black text-xl font-bold rounded-md ${
                  index === 1
                    ? "bg-white text-black border-black"
                    : "bg-yellow-400 text-white "
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>      
        <div className=" h-screen relative -top-20"> 
        <img src="/site 2 assets/bannerimg .svg" className="w-5xl -z-20" alt="" srcSet="" />
        </div>      
    </div>
  )
}

export default Banner
