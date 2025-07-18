import { FiEye } from "react-icons/fi";
import { MdOutlineCheckCircle, MdOutlineCancel } from "react-icons/md";
import { PuffLoader } from "react-spinners";
import { useSelector } from "react-redux";

import { bookingApi } from "../../../features/api/bookingApi";
import type { RootState } from "../../../app/store";

// ✅ Interfaces
interface Booking {
  bookingId: number;
  bookingDate: string;
  returnDate: string;
  totalAmount: string;
  bookingStatus: string;
  user: {
    firstname: string;
    lastname: string;
  };
  vehicle: {
    carImage: string;
    vehicleId: number;
  };
  location: {
    name: string;
  };
  payments: {
    amount: string;
    paymentStatus: string;
  }[];
}

export const Bookings = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const {
    data: bookings = [],
    isLoading,
    error,
  } = bookingApi.useGetAllBookingsQuery(undefined, {
    skip: !isAuthenticated,
  });

  const calculateDaysBooked = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  };

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return `${startDate.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })} - ${endDate.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })}`;
  };

  const renderStatusBadge = (status: string) => {
    const base = "badge badge-outline";
    if (status.toLowerCase() === "confirmed") return `${base} badge-success`;
    if (status.toLowerCase() === "pending") return `${base} badge-warning`;
    if (status.toLowerCase() === "declined") return `${base} badge-error`;
    return base;
  };

  return (
    <>
      <div className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#11120f] via-[#988821] to-[#93141c] animate-pulse">
        All Bookings Page
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Car Image</th>
              <th>Car Booked</th>
              <th>Days Booked</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {error ? (
              <tr>
                <td colSpan={10} className="text-red-500 text-center">
                  Failed to fetch bookings.
                </td>
              </tr>
            ) : isLoading ? (
              <tr>
                <td colSpan={10} className="text-center">
                  <PuffLoader color="#0aff13" />
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center">
                  No Bookings Available
                </td>
              </tr>
            ) : (
              bookings.map((booking: Booking, index: number) => (
                <tr key={booking.bookingId}>
                  <th>{index + 1}</th>
                  <td className="font-bold text-[#3d3935]">
                    {booking.user.firstname} {booking.user.lastname}
                  </td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={booking.vehicle.carImage}
                          alt={`Vehicle ${booking.vehicle.vehicleId}`}
                        />
                      </div>
                    </div>
                  </td>
                  <td>Vehicle #{booking.vehicle.vehicleId}</td>
                  <td>{calculateDaysBooked(booking.bookingDate, booking.returnDate)}</td>
                  <td>${booking.totalAmount}</td>
                  <td>
                    <div className={renderStatusBadge(booking.bookingStatus)}>
                      {booking.bookingStatus}
                    </div>
                  </td>
                  <td>{formatDateRange(booking.bookingDate, booking.returnDate)}</td>
                  <td>{booking.location.name}</td>
                  <td className="flex gap-1">
                    <button className="btn btn-sm btn-outline text-blue-700 hover:text-blue-500">
                      <FiEye />
                    </button>
                    <button className="btn btn-sm btn-outline text-green-600 hover:text-green-400">
                      <MdOutlineCheckCircle />
                    </button>
                    <button className="btn btn-sm btn-outline text-red-600 hover:text-red-400">
                      <MdOutlineCancel />
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
