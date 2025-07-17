import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

// types/location.ts
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
  vehicles?: any[]; // Optional, if your backend includes this later
}

export const Location = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/location");

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error from backend:", errorText);
          return;
        }

        const data: Location[] = await response.json();
        console.log("Fetched locations:", data);
        setLocations(Array.isArray(data) ? data : [data]); // handle single object or array
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };

    fetchLocations();
  }, []);

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
            {locations.map((location, index) => {
              const totalBookings = location.bookings?.length || 0;
              const totalAmount = location.bookings?.reduce(
                (sum, booking) => sum + parseFloat(booking.totalAmount),
                0
              ) || 0;

              return (
                <tr key={location.locationId}>
                  <th>{index + 1}</th>
                  <td className="font-bold text-[#3d3935]">{location.name}</td>
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
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
