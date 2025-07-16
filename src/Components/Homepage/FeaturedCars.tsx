import { vehicleApi } from "../../../features/api/vehicleApi";
import { carData, type Car } from "../../Utils/carData";
import CarCard from "./CarCard";
import { PuffLoader } from "react-spinners";

interface vehicleData {
  vehicleId: number;
  manufacturer: string;
  model: string;
  carRating: number;
  carImage: string;
  location: string;
  rentalRate: number;
  transmission: string;
  engineCapacity: string;
  seatingCapacity: number;
  fuelType: string;
}

export default function FeaturedCars() {
  const { data: vehicleData = [], isLoading, error } = vehicleApi.useGetAllVehiclesQuery({});
  console.log("🚀 ~ featured cars data:", vehicleData);

  // Transform vehicleData to match Car interface
  const transformedVehicleData: Car[] = vehicleData.map((vehicle: vehicleData, index: number) => ({
    id: carData.length + index + 1, // Unique ID after static data
    name: `${vehicle.manufacturer} ${vehicle.model}`,
    description: `${vehicle.fuelType} - ${vehicle.transmission}`,
    image: "https://via.placeholder.com/300x200", // You can use a default image or map image by model
    rating: 4.5, // Optional: mock value or fetch from API if available
    year: 2023, // Optional: replace if you have year in API
    type: "Rental", // Optional: can refine later
    seats: vehicle.seatingCapacity,
    luggage: 2, // mock value
    doors: 4, // mock value
    price: vehicle.rentalRate,
    favorite: false,
  }));

  const allCars: Car[] = [...carData, ...transformedVehicleData];

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
