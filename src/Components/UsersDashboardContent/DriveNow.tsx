import CarCard from "../Homepage/CarCard";
import { carData } from "../../Utils/carData";
import { FaSearch, FaFilter } from "react-icons/fa";

export const DriveNow = () => {
  return (
    <section className="pb-16">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#11120f] via-[#988821] to-[#93141c]  animate-pulse">
        Select Car
      </h2>

      {/* Top bar: Search and Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto mb-8 gap-4">
        <div className="flex items-center bg-gradient-to-br from-[#7c786b] via-[#8e9288] to-[#bab7b6] rounded-full px-4 py-2 w-full md:w-2/3 shadow-sm">
          <FaSearch className="text-white mr-2" />
          <input
            type="text"
            placeholder="Search car name, model"
            className="bg-transparent outline-none text-white w-full placeholder-gray-300"
            disabled
          />
        </div>
        <button className="flex items-center gap-2 bg-yellow-600 hover:bg-gray-600 text-white px-6 py-2 rounded-full shadow-md transition-all">
          <FaFilter />
          <span>Filter</span>
        </button>
      </div>

      {/* Car Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center max-w-7xl mx-auto">
        {carData.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
};
