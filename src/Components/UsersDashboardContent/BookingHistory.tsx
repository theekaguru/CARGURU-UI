
import { FiEdit } from "react-icons/fi"
import { useSelector } from "react-redux"
import { PuffLoader } from "react-spinners"
import Swal from "sweetalert2"
import { bookingApi } from "../../features/api/bookingApi";
import type { RootState } from "../../app/store";


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

const getStatusBadge =(status:string)=>{
  switch(status){
    case "Confirmed":return "badge-success"
    case "Cancelled":return "badge-error"
    case "Pending":return "badge-warning"
    default: return "badge-primary"

  }
}

export const BookingHistory = () => {

  const {user , isAuthenticated} = useSelector((state:RootState)=>state.auth)


  const userId = user?.userId


const { data: bookingData = [], isLoading, error } =
  bookingApi.useGetAllBookingForOneUserByIdQuery(userId, {
    skip: !isAuthenticated,
  });


  console.log("🚀🚀",bookingData)

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

         const [updateBookingStatus] = bookingApi.useUpdateBookingMutation()  //get update mutation

      const handleEdit = async (bookingId: number) => {
      Swal.fire({
        title: "Are you sure?",
        text: "you want to cancel the Bookings?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#2563eb",
        cancelButtonColor: "#f44336",
        confirmButtonText: "yes , cancel it!",
      }).then(async (result) => {
        const UpdatePayload= {
          bookingId: bookingId,
          bookingStatus: "Cancelled"
        }
        if (result.isConfirmed) {
          try {
            const res = await updateBookingStatus(UpdatePayload).unwrap()
            // console.log("💓💓💓",res)
            Swal.fire("Updated", res.message, "success")
          } catch (error) {
            Swal.fire("Something Went Wrong", "Please Try Again", "error")
            console.log("🙂🙂🙂🙂???",error)
          }
        }
      })
    }


  const [deleteBooking] = bookingApi.useDeleteBookingMutation(); // 🆕 get delete mutation

// 🆕 handle delete logic
const handleDelete = async (bookingId: number) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You want to permanently delete this booking?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await deleteBooking(bookingId).unwrap();
        Swal.fire("Deleted!", res.message , "success");
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
        console.log("🙂🙂🙂🙂???",error)
      }
    }
  });
};

  
   return (
           <>
          
     
             <div className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#11120f] via-[#988821] to-[#93141c] animate-pulse">
             Bookings
           </div>
             <div className="overflow-x-auto">
               <table className="table">
                 {/* head */}
                 <thead>
                   <tr>
                       <th>Booking Id</th>
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
                  error ? (
                    <tr>
                      <td colSpan={9}>
                        <div className="text-red-400">Something went wrong. Try again.</div>
                      </td>
                    </tr>
                  ) : isLoading ? (
                    <tr>
                      <td colSpan={9}>
                        <div className="flex justify-center"><PuffLoader color="#0aff13" /></div>
                      </td>
                    </tr>
                  ) : bookingData?.length === 0 ? (

                    <tr>
                      <td colSpan={9} className="text-center">No Booking Available</td>
                    </tr>
                  ) : (
                    bookingData?.map((booking: BookingInterface) => (
                      <tr key={booking.bookingId}>

                        {/* ✅ Booking Id */}
                        <td>{booking.bookingId}</td>

                        {/* ✅ Vehicle Info: Wrapping <div> is valid here because it's inside <td> */}
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12">
                                <img
                                  src={booking.vehicle.specification.vehicleImage}
                                  alt="vehicle image"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{booking.vehicle.specification.manufacturer}</div>
                              <div className="text-sm opacity-50">{booking.vehicle.specification.model}</div>
                            </div>
                          </div>
                        </td>

                        {/* ✅ Number Plate */}
                        <td>{booking.vehicle.specification.numberPlate}</td>

                        {/* ✅ Days Booked */}
                        <td>{calculateDaysBooked(booking.bookingDate, booking.returnDate)}</td>

                        {/* ✅ Total Amount */}
                        <td>Ksh: {booking.totalAmount}</td>

                        {/* ✅ Status with dynamic badge class */}
                        <td>
                          <div className={`badge badge-outline ${getStatusBadge(booking.bookingStatus)}`}>
                            {booking.bookingStatus}
                          </div>
                        </td>

                        {/* ✅ Date Range */}
                        <td>{formatDateRange(booking.bookingDate, booking.returnDate)}</td>

                        {/* ✅ Location */}
                        <td>{booking.location.name}</td>

                        {/* ✅ Edit/Delete Action based on status */}
                    <td className="flex gap-1">
                      {
                        booking.bookingStatus === "Cancelled" ? (
                          // 🆕 Show Delete button if status is Cancelled
                          <button
                            className="btn btn-sm btn-outline text-red-700 hover:text-red-500"
                            onClick={() => handleDelete(booking.bookingId)}
                          >
                            Delete
                          </button>
                        ) : (
                          // ✅ Show Edit (Cancel) button otherwise
                          <button
                            className="btn btn-sm btn-outline text-blue-700 hover:text-blue-500"
                            onClick={() => handleEdit(booking.bookingId)}
                          >
                            <FiEdit />
                          </button>
                        )
                      }
                    </td>


                      </tr>
                    ))
                  )
                }
              </tbody>
             </table>
           </div>
         </>
       );
     };