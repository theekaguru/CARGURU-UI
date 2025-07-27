// src/pages/BookNow.tsx

import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import type { Car } from "../Utils/carData"

export const BookNow = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const car: Car = location.state?.car;

  if (!car) {
    return (
      <div className="p-10 text-center text-xl text-red-500">
        No car selected.
        <br />
        <button onClick={() => navigate(-1)} className="text-blue-500 underline mt-4">
          Go Back
        </button>
      </div>
    );
  }

  const spec = car.specification;

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        userId: location.state?.userId || "123", // dynamic if passed
        vehicleId: car.vehicleId,
        locationId: car.location?.locationId || "789",
        bookingDate: data.pickupDate,
        returnDate: data.returnDate,
        totalAmount: car.rentalRate,
        bookingStatus: "pending",
      };

      await axios.post("http://localhost:5000/api/booking", payload);
      alert("Booking successful ✅");
      reset();
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed ❌");
    }
  };

  return (
    <div className="flex justify-between items-start px-16 py-8">
      {/* Car Preview */}
      <div className="w-2/3 pr-8">
        <img
          src={spec.vehicleImage}
          alt={`${spec.manufacturer} ${spec.model}`}
          className="rounded-xl shadow-md w-full h-[300px] object-cover"
        />
        <h2 className="text-2xl font-bold mt-4">{spec.manufacturer} {spec.model}</h2>
        <p className="text-gray-500">{spec.year}</p>

        <div className="flex gap-4 mt-4 flex-wrap">
          <div className="bg-gray-100 p-2 rounded-md">{spec.seatingCapacity} Seats</div>
          <div className="bg-gray-100 p-2 rounded-md">{spec.fuelType}</div>
          <div className="bg-gray-100 p-2 rounded-md">{spec.transmission}</div>
          <div className="bg-gray-100 p-2 rounded-md">{car.location?.name}</div>
        </div>

        <h3 className="mt-6 font-semibold">Description</h3>
        <p className="text-sm text-gray-600 mt-1">
          {car.description || "No description available."}
        </p>

        <h3 className="mt-6 font-semibold">Features</h3>
        <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-2">
          {spec.features?.split(",").map((feature, idx) => (
            <li key={idx}>✓ {feature.trim()}</li>
          ))}
        </ul>
      </div>

      {/* Booking Form */}
      <div className="w-1/3 bg-white shadow-lg p-6 rounded-lg border">
        <h2 className="text-xl font-bold mb-4">
          Ksh {car.rentalRate} <span className="text-sm text-gray-500">per day</span>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Pickup Date</label>
            <input
              type="date"
              {...register("pickupDate", { required: true })}
              className="input input-bordered w-full border px-2 py-1 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Return Date</label>
            <input
              type="date"
              {...register("returnDate", { required: true })}
              className="input input-bordered w-full border px-2 py-1 rounded"
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
            Book Now
          </button>

          <p className="text-xs text-center text-gray-500 mt-2">No credit card required to reserve</p>
        </form>
      </div>
    </div>
  );
};
