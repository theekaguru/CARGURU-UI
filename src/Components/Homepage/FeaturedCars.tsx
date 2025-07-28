import { vehicleApi } from "../../../features/api/vehicleApi";
import { carData, type Car } from "../../Utils/carData";
import CarCard from "./CarCard";
import { PuffLoader } from "react-spinners";

export default function FeaturedCars() {
  const {
    data: fetchedCars = [],
    isLoading,
    error,
  } = vehicleApi.useGetAllVehiclesQuery({});

  // Ensure fetchedCars is of type Car[]
  const allCars: Car[] = [...carData, ...fetchedCars];

  return (
    <section className="px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Featured Cars
      </h2>

      {error ? (
        <div className="text-red-600 text-center">Something went wrong. Please try again.</div>
      ) : isLoading ? (
        <div className="flex justify-center py-12">
          <PuffLoader color="#26bb4a" />
        </div>
      ) : allCars.length === 0 ? (
        <div className="text-center text-gray-500">No vehicles available.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {allCars.map((car, index) => (
            <CarCard key={`car-${car.vehicleId || index}`} car={car} />
          ))}
        </div>
      )}
    </section>
  );
}
