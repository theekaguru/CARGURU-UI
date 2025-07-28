
import { PuffLoader } from "react-spinners";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { bookingApi } from "../../../features/api/bookingApi";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast, Toaster } from "sonner";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { useForm, type SubmitHandler } from "react-hook-form";
import { SaveIcon } from "lucide-react";

// ✅ Interface for each booking - defines the data structure returned from backend
interface BookingInterface {
  bookingId: number;
  bookingDate: string;
  returnDate: string;
  totalAmount: string;
  bookingStatus: string;

  user: {
    userId: number;
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

type UpdateBookingForm = {
  bookingStatus: string;
  
}

export const Bookings = () => {

   // ✅ Getting auth state from Redux
     const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const userId = user?.userId;

  // ✅ Mutation hook to update booking
    const [] = bookingApi.useUpdateBookingMutation()
      const [updateBooking] = bookingApi.useUpdateBookingMutation();
  const [deleteBooking] = bookingApi.useDeleteBookingMutation();
  
  
    const {data: allBookingsData = [], isLoading, error} = bookingApi.useGetAllBookingsQuery(userId, {
  skip: !isAuthenticated
});
   
  

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

// NEW FORM HOOK:
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateBookingForm>();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<BookingInterface | null>(null);

  const handleEditModalToggle = () => {
    setIsEditModalOpen(!isEditModalOpen);
    reset();
  };

 const onSubmit: SubmitHandler<UpdateBookingForm> = async (data) => {
  if (!currentBooking) return;

  const toastId = toast.loading("Updating booking...");
  try {
    const res = await updateBooking({
      bookingId: currentBooking.bookingId,
      ...data
    }).unwrap();

    toast.success(res.message || "Booking updated successfully ✅", { id: toastId });
    setIsEditModalOpen(false);
  } catch (err: any) {
    toast.error(err?.data?.message || "Error updating booking 🚫", { id: toastId });
  }
};

  const handleEdit = (booking: BookingInterface) => {
    setCurrentBooking(booking);
    setIsEditModalOpen(true);
    reset({
      bookingStatus: booking.bookingStatus,
      // Reset other form fields here
    });
  };

const handleDelete = async (bookingId: number) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You want to cancel this booking?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, cancel it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const toastId = toast.loading("Cancelling booking...");
      try {
        const res = await deleteBooking(bookingId).unwrap();
        toast.success(res.message || "Booking cancelled successfully ✅", { id: toastId });
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to cancel booking.", { id: toastId });
      }
    }
  });
};



   return (
  <>
          <Toaster richColors position="top-right" />
      <div className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#11120f] via-[#988821] to-[#93141c] animate-pulse">
        Bookings
      </div>
    
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Customer</th>
            <th>vehicle</th>
            <th>Number Plate</th>
            <th>Days Booked</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Days</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {error ? (
            <tr>
              <td colSpan={10}>
                <div className="text-red-400">Something went wrong. Try again.</div>
              </td>
            </tr>
          ) : isLoading ? (
            <tr>
              <td colSpan={10}>
                <div className="flex justify-center"><PuffLoader color="#0aff13" /></div>
              </td>
            </tr>
          ) : allBookingsData?.length === 0 ? (
            <tr>
              <td colSpan={10} className="text-center">No Bookings Available</td>
            </tr>
          ) : (
            allBookingsData?.map((booking: BookingInterface) => (
              <tr key={booking.bookingId}>
                {/* Booking Id */}
                <td>{booking.bookingId}</td>

                {/* Customer Info */}
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

                {/* Vehicle Info */}
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

                {/* Actions */}
                <td className="flex gap-1">
                    <button 
                      onClick={() => handleEdit(booking)} 
                      className="btn btn-sm btn-outline text-blue-500 mr-2"
                    >
                      <FiEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(booking.bookingId)} 
                      className="btn btn-sm btn-outline text-red-500"
                    >
                      <AiFillDelete />
                    </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
        {/* Edit Booking Modal */}
      {isEditModalOpen && currentBooking && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex justify-center items-center mb-4">
              <h2 className="text-2xl font-bold text-orange-500">Update Booking</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div>
                  <label htmlFor="bookingStatus" className="block text-sm font-medium text-orange-500">
                    Booking Status
                  </label>
                  <select
                    id="bookingStatus"
                    className="select w-full text-blue-500 text-sm"
                    {...register("bookingStatus", { required: "Status is required" })}
                  >
                    <option value="">Select Status</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  {errors.bookingStatus && (
                    <p className="text-red-500 text-sm">{errors.bookingStatus.message}</p>
                  )}
                </div>

                {/* Add other editable fields here */}
              </div>

              <div className="flex justify-end mt-4">
                <button 
                  onClick={handleEditModalToggle} 
                  type="button" 
                  className="btn btn-error mr-2"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <SaveIcon /> Update Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};