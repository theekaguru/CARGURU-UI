import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GiGearStickPattern, GiGasPump } from "react-icons/gi";
import { PiEngineLight } from "react-icons/pi";
import { BsPeopleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../../app/store";
import type { Car } from "../../Utils/carData";

interface Props {
  car: Car;
}

export default function CarCard({ car }: Props) {
  if (!car || !car.specification) return null;
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const spec = car.specification;
  console.log(car);

  return (
    <div className="bg-gradient-to-br from-[#817962] via-[#a2a099] to-[#c5c0ab] shadow-md w-full max-w-96 transition-transform duration-300 hover:scale-105 hover:shadow-xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-[#5c260b]">
            {spec.manufacturer} {spec.model}
          </h3>
          <p className="text-sm text-[#0d500c]">{spec.model}</p>
        </div>
        <div className="flex items-center gap-1 text-[#761623] font-semibold">
          <FaStar />
          <span>{car.carRating ?? "4.5"}</span>
        </div>
      </div>

      {/* Car Image */}
      <div className="relative">
        <img
          src={spec.vehicleImage}
          alt={`${spec.manufacturer} ${spec.model}`}
          className="w-full h-40 object-cover rounded-md my-3"
        />
        <span
          className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full ${car.availability.toLowerCase() === "available"
            ? "bg-[#0c691f] text-white"
            : "bg-[#bc1629] text-white"
            }`}
        >
          {car.availability.toLowerCase() === "available"
            ? "Available"
            : "Unavailable"}
        </span>
      </div>

      {/* Location */}
      <div className="flex items-center text-sm gap-1 mb-2">
        <FaLocationDot className="text-[#690c17]" />
        <span>{car.location?.name || "Unknown Location"}</span>
      </div>

      {/* Price */}
      <div className="text-lg font-bold mb-2 text-black">
        ksh {car.rentalRate}
        <span className="text-sm text-gray-500"> /Day</span>
      </div>

      {/* Features */}
      <div className="flex flex-wrap justify-between text-sm text-gray-600 mt-3">
        <div className="flex items-center gap-1 mb-2">
          <GiGearStickPattern />
          {spec.transmission}
        </div>
        <div className="flex items-center gap-1 mb-2">
          <PiEngineLight />
          {spec.engineCapacity}
        </div>
        <div className="flex items-center gap-1 mb-2">
          <BsPeopleFill />
          {spec.seatingCapacity} seater
        </div>
        <div className="flex items-center gap-1 mb-2">
          <GiGasPump />
          {spec.fuelType}
        </div>
      </div>

      {/* Book/Login Button */}
      {isAuthenticated ? (
        car?.vehicleId && (
          <Link
            to={`/vehicles/${car.vehicleId}`}
          >
            View Details
          </Link>
        )
      ) : (
        <Link
          to="/login"
          className="bg-[#888776] w-full mt-4 py-2 rounded-md text-[#161135] transition-transform duration-300 hover:scale-105 hover:shadow-xl font-bold text-center block"
        >
          Login to book
        </Link>
      )}
    </div>
  );
}
