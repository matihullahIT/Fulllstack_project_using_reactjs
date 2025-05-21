import { footersection } from "../constants";

const Footer = () => {
  return (
    <div id="contact" className="  bg-[#f8f9ff] flex flex-col items-center justify-between pt-16 relative">
      
      {/* Heading */}
      <h3 className="playfair text-4xl font-bold underline underline-offset-[14px] decoration-yellow-400 mb-10">Contact us</h3>

      {/* Form */}
      <div className="flex flex-col items-start w-[90%] max-w-md gap-4 px-4">
        <label htmlFor="name" className="text-gray-700">Name</label>
        <input type="text" placeholder="John Doe" required className="w-full bg-white border rounded-sm text-lg p-2" />

        <label htmlFor="email" className="text-gray-700">Email</label>
        <input type="email" placeholder="john@example.com" className="w-full bg-white border rounded-sm text-lg p-2"
        onBlur={(e)=>{
          e.target.value.includes("@")?null:alert("invalid email")
        }}
        required
        />

        <label htmlFor="message" className="text-gray-700">Message</label>
        <textarea rows={4} placeholder="Your message" className="w-full bg-white border rounded-sm text-lg p-2"></textarea>

        <input type="submit" value="Send" className="bg-yellow-400 px-5 py-2 rounded-md font-semibold cursor-pointer self-end" />
      </div>

      {/* Icons */}
      <div className="flex items-center justify-center gap-4 my-8">
        {footersection.icon?.map((item, index) => (
          <img key={index} src={item} alt={`icon-${index}`} className="w-6 h-6" />
        ))}
      </div>

      {/* Copyright */}
      <p className="mb-8 text-gray-500 text-sm">Madelyn Torff 2021</p>

      {/* Wave Image */}
      <img src="/site%202%20assets/contactuswavesvg.svg" className="w-full h-auto mt-4" alt="wave" />
    </div>
  );
};

export default Footer;
