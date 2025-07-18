import { PuffLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { vehicleApi } from "../../../features/api/vehicleApi";
import type { RootState } from "../../../app/store";

type Location = {
  locationId: number;
  name: string;
  address: string;
  contactPhone: string;
  createdAt: string;
  updatedAt: string;
};

type Specification = {
  vehicleSpecId: number;
  manufacturer: string;
  model: string;
  year: number;
  fuelType: string;
  engineCapacity: string;
  transmission: string;
  seatingCapacity: number;
  color: string;
  features: string;
};

type Booking = {
  bookingId: number;
  userId: number;
  vehicleId: number;
  locationId: number;
  bookingDate: string;
  returnDate: string;
  totalAmount: string;
  bookingStatus: string;
  createdAt: string;
  updatedAt: string;
};

type Vehicle = {
  vehicleId: number;
  carImage: string;
  rentalRate: string;
  availability: string;
  location: Location;
  specification: Specification;
  bookings: Booking[];
};

export const Cars = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { data: vehicles = [], isLoading, error } = vehicleApi.useGetAllVehiclesQuery(undefined, {
    skip: !isAuthenticated,
  });

  return (
    <div className="p-4">
      <div className="text-2xl font-bold text-center mb-4 text-orange-400">All Vehicles</div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Model</th>
              <th>Manufacturer</th>
              <th>Year</th>
              <th>Color</th>
              <th>Fuel Type</th>
              <th>Location</th>
              <th>Availability</th>
              <th>Rental Rate</th>
            </tr>
          </thead>
          <tbody>
            {error ? (
              <tr>
                <td colSpan={8} className="text-red-400 text-center">Something went wrong. Please try again.</td>
              </tr>
            ) : isLoading ? (
              <tr>
                <td colSpan={8} className="text-center"><PuffLoader color="#0aff13" /></td>
              </tr>
            ) : vehicles.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center">No Vehicles Available</td>
              </tr>
            ) : (
              vehicles.map((vehicle: Vehicle) => (
                <tr key={vehicle.vehicleId}>
                  <td>{vehicle.specification?.model}</td>
                  <td>{vehicle.specification?.manufacturer}</td>
                  <td>{vehicle.specification?.year}</td>
                  <td>{vehicle.specification?.color}</td>
                  <td>{vehicle.specification?.fuelType}</td>
                  <td>{vehicle.location?.name || "No Location"}</td>
                  <td>{vehicle.availability}</td>
                  <td>KES {vehicle.rentalRate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
