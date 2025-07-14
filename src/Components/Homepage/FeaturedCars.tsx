import { carData } from "../../Utils/carData";
import CarCard from "./CarCard";

export default function FeaturedCars() {
  return (
    <section className="px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Featured Cars
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {carData.slice(0, 8).map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}
