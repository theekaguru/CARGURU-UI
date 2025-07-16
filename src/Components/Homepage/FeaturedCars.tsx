import { vehicleApi } from "../../../features/api/vehicleApi";
import { carData, type Car } from "../../Utils/carData";
import CarCard from "./CarCard";
import { PuffLoader } from "react-spinners";

export default function FeaturedCars() {
  const { data: fetchedCars = [], isLoading, error } = vehicleApi.useGetAllVehiclesQuery({});
  console.log("🚀 ~ carsdata:", fetchedCars);

  // Assume fetchedCars is already in the correct Car[] format
  const allCars: Car[] = [...carData, ...fetchedCars];

  return (
    <section className="px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Featured Cars
      </h2>

      {error ? (
        <div className="text-red-500">Something went wrong, try again...</div>
      ) : isLoading ? (
        <div className="flex justify-center">
          <PuffLoader color="#26bb4a" />
        </div>
      ) : allCars.length === 0 ? (
        <div>No Vehicles</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {allCars.map((car) => (
            <CarCard key={car.vehicleId} car={car} />
          ))}
        </div>
      )}
    </section>
  );
}
