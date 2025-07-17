import { useEffect, useState } from "react";
import axios from "axios";

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
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/vehicle");
        setVehicles(res.data);
        console.log("Fetched vehicles:", res.data);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Vehicles</h1>
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
          {vehicles.map((vehicle) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
};
