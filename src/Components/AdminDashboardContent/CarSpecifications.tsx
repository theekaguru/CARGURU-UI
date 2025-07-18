import { FiEdit, FiTrash2 } from "react-icons/fi";
import { PuffLoader } from "react-spinners";
import { useSelector } from "react-redux";

import { vehicleSpecApi } from "../../../features/api/vehicleSpecApi";
import type { RootState } from "../../../app/store";

interface Vehicle {
  vehicleId: number;
  carImage: string;
  rentalRate: string;
  availability: string;
}

interface CarSpecification {
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
  vehicles: Vehicle[];
}

export const CarSpecifications = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const {
    data: carSpecs = [],
    isLoading,
    error,
  } = vehicleSpecApi.useGetAllVehicleSpecificationsQuery(undefined, {
    skip: !isAuthenticated,
  });

  return (
    <>
      <div className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#11120f] via-[#988821] to-[#93141c] animate-pulse">
        All Car Specifications
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Spec ID</th>
              <th>Model</th>
              <th>Manufacturer</th>
              <th>Year</th>
              <th>Fuel</th>
              <th>Engine</th>
              <th>Transmission</th>
              <th>Color</th>
              <th>Seats</th>
              <th>Features</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {error ? (
              <tr>
                <td colSpan={13} className="text-red-400 text-center">
                  Something went wrong. Please try again.
                </td>
              </tr>
            ) : isLoading ? (
              <tr>
                <td colSpan={13} className="text-center">
                  <PuffLoader color="#0aff13" />
                </td>
              </tr>
            ) : carSpecs.length === 0 ? (
              <tr>
                <td colSpan={13} className="text-center">
                  No Car Specifications Available
                </td>
              </tr>
            ) : (
              carSpecs.map((spec: CarSpecification, index: number) => (
                <tr key={spec.vehicleSpecId}>
                  <th>{index + 1}</th>
                  <td>
                    {spec.vehicles?.[0]?.carImage ? (
                      <img
                        src={spec.vehicles[0].carImage}
                        alt={spec.model}
                        className="w-16 h-12 rounded object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 italic">No image</span>
                    )}
                  </td>
                  <td>{spec.vehicleSpecId}</td>
                  <td className="font-bold text-[#3d3935]">{spec.model}</td>
                  <td>{spec.manufacturer}</td>
                  <td>{spec.year}</td>
                  <td>{spec.fuelType}</td>
                  <td>{spec.engineCapacity}</td>
                  <td>{spec.transmission}</td>
                  <td>{spec.color}</td>
                  <td>{spec.seatingCapacity}</td>
                  <td>{spec.features}</td>
                  <td className="flex gap-1">
                    <button className="btn btn-sm btn-outline text-green-700 hover:text-green-500">
                      <FiEdit />
                    </button>
                    <button className="btn btn-sm btn-outline text-red-700 hover:text-red-500">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
