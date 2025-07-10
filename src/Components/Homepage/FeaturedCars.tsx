
import { carData } from "../../Utils/carData";
import CarCard from "./CarCard";

export default function FeaturedCars() {
  return (
    <section className="py-12 px-4 bg-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Cars</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {carData.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}
