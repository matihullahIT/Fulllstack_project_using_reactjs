import Footer from "./Footer"
import Navbar from "./Navbar"

const Aboutus = () => {
  return (
    <div>
        <Navbar/>
        <div className="h-screen w-full flex items-center justify-center">
        <div className=" h-screen w-6xl flex flex-col-reverse md:flex-row  lg:flex-row items-center justify-center ">
            <div className="px-8 flex flex-col items-baseline justify-center">
                <h1 className="playfair text-7xl font-bold">Lorem, ipsum.</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam maiores quam dicta blanditiis rem temporibus, autem iste maxime soluta, quibusdam accusantium ipsam velit doloremque fuga odio deserunt dolorum quis. Vero repellendus quas ullam, esse minus magni perspiciatis dolores voluptate architecto blanditiis. Obcaecati vero voluptatibus eaque ducimus. Facilis libero magnam non.</p>
                <a href="#" className="border-1 px-5 py-4 my-5 text-xl font-bold rounded-md text-white bg-yellow-400 ">My Resume</a>
            </div>
            <img src="/site 2 assets/about us.svg" alt="about us image" />
        </div>
        </div>
        <Footer/>      
    </div>
  )
}

export default Aboutus
