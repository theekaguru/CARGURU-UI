import { Star } from "lucide-react";
import type { Car } from "../../Utils/carData";


interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-xs">
      <div className="relative">
        <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="text-yellow-400 w-4 h-4" fill="currentColor" stroke="none" />
          {car.rating.toFixed(1)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold">{car.name}</h3>
        <p className="text-gray-500 text-sm">{car.description}</p>
      </div>
    </div>
  );
}
