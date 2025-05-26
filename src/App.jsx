import "./index.css"
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Testimonial from "./components/Testimonisal";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Aboutus from "./components/Aboutus";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div className="">
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div className="flex flex-col items-center justify-center">
              <div>
                <div className="z-10  items-center justify-center">
                  <Navbar />
                </div>
                <Banner />
              </div>
              <div>
              </div>
              <Testimonial/>
              <Footer/>
            </div>
          } />
          <Route path="/about" element={<Aboutus />} />
        </Routes>
      </BrowserRouter> */}
    </div>
  )
}

export default App
