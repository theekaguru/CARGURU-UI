
import { FiEye} from "react-icons/fi";
import { PuffLoader } from "react-spinners";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import Swal from "sweetalert2";
import { bookingApi } from "../../../features/api/bookingApi";
import { MdOutlineCancel, MdOutlineCheckCircle } from "react-icons/md";

interface BookingInference{
  bookingId: number;
  bookingDate: string;
  returnDate: string;
  totalAmount: string;
  bookingStatus: string;
  specification: {
    manufacturer: string;
    model: string;
    vehicleImage:string;
    numberPlate:string;
    seatingCapacity:string;
  };
  user: {
    firstname: string;
    lastname: string;
    profileImage:string;
    email:string;
  };
  vehicle: {
    vehicleId: number;
    rentalRate: number;
  };
  location: {
    name: string;
  };
  payments: {
    amount: string;
    paymentStatus: string;
    paymentDate:string;
    paymentMethod:string;
    transactionId:string;
  };
}


export const Bookings = () => {
  
    const {user , isAuthenticated} =useSelector((state:RootState)=>state.auth)
    const [updateBookingStatus] = bookingApi.useUpdateBookingMutation()
  
    const userId =user?.userId;
  
    const {data: allBookingsData = [], isLoading, error} = bookingApi.useGetAllBookingsQuery(userId, {
  skip: !isAuthenticated
});
   
    console.log("🚀~Bookings ~BookingsData:",allBookingsData)
  
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
        const updatePayload = {
          bookingId: bookingId,
          status: "Unavailable"
        }
        if (result.isConfirmed) {
          try {
            const res = await updateBookingStatus(updatePayload).unwrap()
            console.log(res)
            Swal.fire("Updated", res.message, "success")
          } catch (error) {
            Swal.fire("Something Went Wrong", "Please Try Again", "error")
          }
        }
      })
    }
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

  const getStatusBadge =(status:string)=>{
  switch(status){
    case "Avaialble":return "badge-success"
    case "Unavailable":return "badge-error"
    default: return "badge-primary"

  }
}
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
                error ? (
                  <div className="text-red-400">
                    something went Wrong try Again .....
                  </div>   
                ): isLoading ? (
                  <div>
                   <PuffLoader color="#0aff13"/>
                  </div>
                ) : allBookingsData?.length === 0 ? (
                  <tr>
                    <div>No Available</div>
                  </tr>
                ):(
                  allBookingsData?.map((booking:BookingInference)=>(
                    <tr key={booking.bookingId}>

{/* Booking Id */}
                      <td>
                        <th>{booking.bookingId}</th>
                      </td>

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
                    <div className="font-bold">{booking.user.firstname }</div>
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
                        src={booking.specification?.vehicleImage}
                        alt="vehicle image" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{booking.specification?.manufacturer}</div>
                    <div className="text-sm opacity-50">{booking.specification?.model}</div>
                  </div>
                </div>
              </td>
  
{/* Number Plate*/}
  
                <td>{booking.specification?.numberPlate}</td>
{/* Booking Days */}
  
                <td>{calculateDaysBooked(booking.bookingDate, booking.returnDate)}</td>

{/* TotalAmount */}
  
                <td>Ksh{booking.totalAmount}</td>
  
  
{/* Status*/}
   
                <td>
                <div className={`badge badge-outline ${getStatusBadge(booking.bookingStatus)}`}>
                {booking.bookingStatus}</div>
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};