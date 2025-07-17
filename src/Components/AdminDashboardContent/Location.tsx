import { FiEdit, FiTrash2 } from "react-icons/fi";

export const Location = () => {
  // Example hardcoded backend response (you'll replace this with fetched data later)
  const location = {
    locationId: 1,
    name: "Nairobi HQ",
    address: "1st Avenue, Nairobi",
    contactPhone: "0711000000",
    bookings: [
      {
        bookingId: 1,
        totalAmount: "10000",
        bookingStatus: "Confirmed",
      },
      {
        bookingId: 2,
        totalAmount: "12000",
        bookingStatus: "Confirmed",
      },
    ],
    totalVehicles: 5, // Add this manually or fetch from backend later
  };

  const totalBookings = location.bookings.length;
  const totalAmount = location.bookings.reduce(
    (sum, booking) => sum + parseFloat(booking.totalAmount),
    0
  );

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
              <th>Location ID</th>
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
            <tr>
              <th>1</th>
              <td>{location.locationId}</td>
              <td className="font-bold text-[#3d3935]">{location.name}</td>
              <td>{location.address}</td>
              <td>{location.contactPhone}</td>
              <td>{totalBookings}</td>
              <td>{location.totalVehicles}</td>
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
          </tbody>
        </table>
      </div>
    </>
  );
};
