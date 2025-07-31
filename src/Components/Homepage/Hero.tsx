import { Link } from "react-router-dom";

export const Hero= () => {
  return (
    <section className="relative bg-[#0C1729] text-white overflow-hidden">
      <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Premium <span className="text-[#6896C0]">Car Rental</span> Service
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-lg">
            Experience luxury and comfort with our wide selection of premium vehicles. Perfect for business or leisure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/vehicles"
              className="bg-[#6896C0] hover:bg-[#2D4974] text-[#0C1729] font-bold py-3 px-6 rounded-lg transition duration-300 text-center"
            >
              Browse Cars
            </Link>
            <Link
              to="/about"
              className="border border-[#6896C0] hover:bg-[#1D3C6E] text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 z-10 flex justify-center">
          <img 
            src="https://source.unsplash.com/random/800x600?luxury-car" 
            alt="Luxury Car" 
            className="rounded-lg shadow-2xl max-w-full h-auto"
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1F1E1C] to-transparent z-0"></div>
    </section>
  );
};