import { vehicleApi } from "../../features/api/vehicleApi";
import { carData, type Car } from "../../Utils/carData";
import CarCard from "./CarCard";
import { PuffLoader } from "react-spinners";

export default function FeaturedCars() {
  const {
    data: fetchedCars = [],
    isLoading,
    error,
  } = vehicleApi.useGetAllVehiclesQuery({});

  const allCars: Car[] = [...carData, ...fetchedCars];

  return (
    <section className="px-4 py-12 bg-[#0A192F] text-[#DCE3F0] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-[#E2ECFD] tracking-tight">
          Explore Our Top Picks
        </h2>
        <p className="text-center text-[#AAB8C2] mb-12 text-lg max-w-2xl mx-auto">
          Hand-picked premium vehicles just for you. Unmatched quality and comfort.
        </p>

        {error ? (
          <div className="text-red-400 text-center">Something went wrong. Please try again.</div>
        ) : isLoading ? (
          <div className="flex justify-center py-16">
            <PuffLoader color="#3B82F6" size={50} />
          </div>
        ) : allCars.length === 0 ? (
          <div className="text-center text-[#AAB8C2]">No vehicles available at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {allCars.map((car, index) => (
              <CarCard key={`car-${car.vehicleId || index}`} car={car} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
