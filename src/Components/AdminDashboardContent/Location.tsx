import { FiEdit, FiTrash2 } from "react-icons/fi";
import { PuffLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { locationApi } from "../../../features/api/locationApi";
import type { RootState } from "../../../app/store";

// ✅ Interfaces
export interface Booking {
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
}

export interface Location {
  locationId: number;
  name: string;
  address: string;
  contactPhone: string;
  createdAt: string;
  updatedAt: string;
  bookings: Booking[];
  vehicles?: any[];
}

export const Location = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const {
    data: locations = [],
    isLoading,
    error,
  } = locationApi.useGetAllLocationsQuery(undefined, {
    skip: !isAuthenticated,
  });

  return (
    <>
      <div className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#11120f] via-[#988821] to-[#93141c] animate-pulse">
        All Locations
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Total Bookings</th>
              <th>Total Vehicles</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {error ? (
              <tr>
                <td colSpan={8} className="text-red-500 text-center">
                  Failed to load locations.
                </td>
              </tr>
            ) : isLoading ? (
              <tr>
                <td colSpan={8} className="text-center">
                  <PuffLoader color="#0aff13" />
                </td>
              </tr>
            ) : locations.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center">
                  No Locations Found
                </td>
              </tr>
            ) : (
              locations.map((location: Location, index: number) => {
                const totalBookings = location.bookings?.length || 0;
                const totalAmount =
                  location.bookings?.reduce(
                    (sum, booking) => sum + parseFloat(booking.totalAmount),
                    0
                  ) || 0;

                return (
                  <tr key={location.locationId}>
                    <th>{index + 1}</th>
                    <td className="font-bold text-[#3d3935]">
                      {location.name}
                    </td>
                    <td>{location.address}</td>
                    <td>{location.contactPhone}</td>
                    <td>{totalBookings}</td>
                    <td>{location.vehicles?.length || "N/A"}</td>
                    <td>${totalAmount.toLocaleString()}</td>
                    <td className="flex gap-1">
                      <button className="btn btn-sm btn-outline text-green-700 hover:text-green-500">
                        <FiEdit />
                      </button>
                      <button className="btn btn-sm btn-outline text-red-700 hover:text-red-500">
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
