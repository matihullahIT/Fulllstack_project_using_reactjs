import "../index.css"
import {testimonialSection} from "../constants"
const Testimonisal = () => {
  return (
    <div id="projects" className="my-7 max-w-7xl relative flex flex-col
     items-center justify-center gap-4">
       <h3 className="playfair text-4xl font-bold underline underline-offset-[14px] decoration-yellow-400 mb-10">
        Projects
      </h3>
        {testimonialSection.map((item,index)=>(
            <div key={index} className={` my-7 bg-white flex max-w-5xl
               h-screen items-center shadow-xl rounded-3xl overflow-hidden 
               justify-center flex-col-reverse 
            ${index===1 ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
                <div  id={item.id} className="p-6 flex flex-col gap-8  
                py-7
                items-baseline justify-between  ">
                    <h4 className="font-bold playfair text-5xl">{item.name}</h4>
                    <p className="text-xl">{item.details}</p>
                    <button className="border-2 rounded-full px-5 py-3 transition-all ease-in-out hover:bg-black hover:text-white">{item.btn}</button>
                </div>
                <img src={item.img} className="h-screen" alt="" srcSet="" />
            </div>
        ))}
    </div>
  )
}

export default Testimonisal
