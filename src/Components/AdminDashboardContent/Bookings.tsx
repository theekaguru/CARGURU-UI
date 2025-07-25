import { FiEye} from "react-icons/fi";
import { PuffLoader } from "react-spinners";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { bookingApi } from "../../../features/api/bookingApi";
import { MdOutlineCancel, MdOutlineCheckCircle } from "react-icons/md";

// ✅ Interface for each booking - defines the data structure returned from backend
interface BookingInterface {
  bookingId: number;
  bookingDate: string;
  returnDate: string;
  totalAmount: string;
  bookingStatus: string;

  user: {
    firstname: string;
    contactPhone: string;
    lastname: string;
    profileImage: string;
    email: string;
  };

  vehicle: {
    vehicleId: number;
    rentalRate: number;

    specification: {
      manufacturer: string;
      model: string;
      vehicleImage: string;
      numberPlate: string;
      seatingCapacity: string;
    };
  };

  location: {
    name: string;
  };

  payments: {
    amount: string;
    paymentStatus: string;
    paymentDate: string;
    paymentMethod: string;
    transactionId: string;
  };
}


export const Bookings = () => {

   // ✅ Getting auth state from Redux
    const {user , isAuthenticated} =useSelector((state:RootState)=>state.auth)

  // ✅ Mutation hook to update booking
    const [] = bookingApi.useUpdateBookingMutation()
  
    const userId =user?.userId;
  
    const {data: allBookingsData = [], isLoading, error} = bookingApi.useGetAllBookingsQuery(userId, {
  skip: !isAuthenticated
});
   
    console.log("🚀~Bookings ~BookingsData:",allBookingsData)


    // ✅ Utility: Calculate how many days a booking covers
    const calculateDaysBooked = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  };

   // ✅ Utility: Format the booking date range
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

  // ✅ Utility: Set badge color class based on booking status
  const getStatusBadge =(status:string)=>{
  switch(status){
    case "Confirmed":return "badge-success"
    case "Cancelled":return "badge-error"
    case "Pending":return "badge-warning"
    default: return "badge-primary"

  }
}
    return (
      <>
        <div className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#11120f] via-[#988821] to-[#93141c] animate-pulse">
        Bookings
      </div>
      {
        error ? (
                  <div className="text-red-500">
                          something went wrong try again
                    </div>
                  ):isLoading ? (
                    <div className="loading">
                      <PuffLoader/>
                      loading....
                    </div>
                   ) : allBookingsData?.length === 0 ? (
                    <div>No Bookings Available</div>
                  ):(
                    <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                  <th>Booking Id</th>
                  <th>Customer</th>
                  <th>vehicle</th>
                  <th>Number Plate</th>
                  <th>Days Booked</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Date Booked</th>
                  <th>Location</th>
                  <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                  allBookingsData?.map((booking:BookingInterface)=>( 
                    <tr key={booking.bookingId}>

{/* Booking Id */}
                      <td>{booking.bookingId}</td>

{/* profileImage , username and email */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={booking.user.profileImage}
                              alt="user image" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{booking.user.firstname} {booking.user.lastname}</div>
                          <div className="font-bold">{booking.user.contactPhone}</div>
                          <div className="text-sm opacity-50">{booking.user.email}</div>
                        </div>
                      </div>
                    </td>

{/* image, manufacturer , model */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={booking.vehicle.specification.vehicleImage}
                              alt="vehicle image" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{booking.vehicle.specification.manufacturer}</div>
                          <div className="text-sm opacity-50">{booking.vehicle.specification.model}</div>
                        </div>
                      </div>
                    </td>

{/* Number Plate*/}
                    <td>{booking.vehicle.specification.numberPlate}</td>

{/* Booking Days */}
                    <td>{calculateDaysBooked(booking.bookingDate, booking.returnDate)}</td>

{/* TotalAmount */}
                    <td>Ksh{booking.totalAmount}</td>

{/* Status*/}
                    <td>
                      <div className={`badge badge-outline ${getStatusBadge(booking.bookingStatus)}`}>
                        {booking.bookingStatus}
                      </div>
                    </td>

{/* Booking Date */}
                    <td>{formatDateRange(booking.bookingDate, booking.returnDate)}</td> 

{/* Location*/}
                    <td>{booking.location.name}</td>

{/* update and delete car */}
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
                ))}
            </tbody>
          </table>
        </div>
      )}

      </>
    );
};
