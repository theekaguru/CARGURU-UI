import { Star } from "lucide-react";
import type { Car } from "../../Utils/carData";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <div className="shadow-md overflow-hidden w-full max-w-xs transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-lg">
      {/* Car Image */}
      <div className="relative group">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
        />
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded-full flex items-center gap-1">
          <Star
            className="text-yellow-400 w-4 h-4"
            fill="currentColor"
            stroke="none"
          />
          {car.rating.toFixed(1)}
        </div>
      </div>

      {/* Car Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold">{car.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{car.description}</p>
      </div>
    </div>
  );
}