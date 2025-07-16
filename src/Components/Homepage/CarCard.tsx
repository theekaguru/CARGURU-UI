import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GiGearStickPattern, GiGasPump } from "react-icons/gi";
import { PiEngineLight } from "react-icons/pi";
import { BsPeopleFill } from "react-icons/bs";
import type { Car } from "../../Utils/carData"; // use your correct relative path

interface Props {
  car: Car;
}

export default function CarCard({ car }: Props) {
  return (
    <div className=" shadow-md  w-full max-w-xs transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-lg">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-gray-800">
            {car.manufacturer} {car.model}
          </h3>
          <p className="text-sm text-gray-600">{car.model}</p>
        </div>
        <div className="flex items-center gap-1 text-orange-500 font-semibold">
          <FaStar />
          <span>{car.carRating}</span>
          <span className="text-gray-400 text-xs">(100)</span>
        </div>
      </div>

      {/* Car Image */}
      <img
        src={car.carImage}
        alt={`${car.manufacturer} ${car.model}`}
        className="w-full h-40 object-cover rounded-md my-3"
      />

      {/* Location */}
      <div className="flex items-center text-sm text-gray-600 gap-1 mb-2">
        <FaLocationDot className="text-red-400" />
        <span>{car.location}</span>
      </div>

      {/* Rental Rate */}
      <div className="text-lg font-bold mb-2 text-black">
        ksh <span className="text-blue-700">{car.rentalRate}</span>
        <span className="text-sm text-gray-500"> /Day</span>
      </div>

      {/* Car Features Row */}
      <div className="flex flex-wrap justify-between text-sm text-gray-600 mt-3">
        <div className="flex items-center gap-1 mb-2">
          <GiGearStickPattern />
          {car.transmission}
        </div>
        <div className="flex items-center gap-1 mb-2">
          <PiEngineLight />
          {car.engineCapacity}
        </div>
        <div className="flex items-center gap-1 mb-2">
          <BsPeopleFill />
          {car.seatingCapacity} Persons
        </div>
        <div className="flex items-center gap-1 mb-2">
          <GiGasPump />
          {car.fuelType}
        </div>
      </div>

      {/* Rent Now Button */}
      <button className="bg-blue-600 text-white w-full mt-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition">
        Rent Now
      </button>
    </div>
  );
}
