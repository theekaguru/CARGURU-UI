
import { FiEdit } from "react-icons/fi"
import { useSelector } from "react-redux"
import { PuffLoader } from "react-spinners"
import Swal from "sweetalert2"
import { paymentApi } from "../../features/api/paymentApi";
import type { RootState } from "../../app/store";


export interface PaymentInterface {
  paymentId: number;
  bookingId: number;
  amount: string;
  paymentStatus: string;
  paymentDate: string;
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
  booking: {
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
    user: {
      userId: number;
      firstname: string;
      lastname: string;
      email: string;
      password: string;
      contactPhone: string;
      address: string;
      userType: string;
      confirmationCode: string;
      emailVerified: boolean;
      profileImage: string;
      createdAt: string;
      updatedAt: string;
    };
    vehicle: {
      vehicleId: number;
      vehicleSpecId: number;
      locationId: number;
      rentalRate: string;
      availability: string;
      createdAt: string;
      updatedAt: string;
      specification: {
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
        vehicleImage: string;
        numberPlate: string;
      };
      location: {
        locationId: number;
        name: string;
        address: string;
        contactPhone: string;
        createdAt: string;
        updatedAt: string;
      };
    };
    location: {
      locationId: number;
      name: string;
      address: string;
      contactPhone: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Confirmed": return "badge-success"
    case "Cancelled": return "badge-error"
    case "Pending": return "badge-warning"
    default: return "badge-primary"

  }
}

export const Payments = () => {

  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  const userId = user?.userId


  const { data: paymentData = [], isLoading, error } = paymentApi.useGetAllPaymentForUserByIdQuery(userId, {
    skip: !isAuthenticated,
  });


  console.log("🚀🚀 ~payments Data", paymentData)

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

  const [updatePaymentStatus] = paymentApi.useUpdatePaymentMutation()  //get update mutation

  const handleEdit = async (paymentId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "you want to cancel the Bookings?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#f44336",
      confirmButtonText: "yes , cancel it!",
    }).then(async (result) => {
      const UpdatePayload = {
        paymentId: paymentId,
        paymentStatus: "Cancelled"
      }
      if (result.isConfirmed) {
        try {
          const res = await updatePaymentStatus(UpdatePayload).unwrap()
          console.log("💓💓💓", res)
          Swal.fire("Updated", res.message, "success")
        } catch (error) {
          Swal.fire("Something Went Wrong", "Please Try Again", "error")
          console.log("🙂🙂🙂🙂???", error)
        }
      }
    })
  }


  const [deletePayment] = paymentApi.useDeletePaymentMutation(); // 🆕 get delete mutation

  // 🆕 handle delete logic
  const handleDelete = async (paymentId: number) => {
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
          const res = await deletePayment(paymentId).unwrap();
          Swal.fire("Deleted!", res.message, "success");
        } catch (error) {
          Swal.fire("Error!", "Something went wrong.", "error");
          console.log("🙂🙂🙂🙂???", error)
        }
      }
    });
  };


  return (
    <>


      <div className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#11120f] via-[#988821] to-[#93141c] animate-pulse">
        Payments
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Id</th>
              <th>vehicle</th>
              <td>Number Plate</td>
              <th>pick up Location</th>
              <th>Drop off Location</th>
              <th>Date Booked</th>
              <th>Days Booked</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              error ? (
                <tr>
                  <td colSpan={9}>
                    <div className="text-red-400 text-center">
                      {
                        'data' in error
                          ? (error.data as { message?: string })?.message ?? "An unexpected error occurred."
                          : "An unexpected error occurred."
                      }
                    </div>
                  </td>
                </tr>
              ) : isLoading ? (

                <tr>
                  <td colSpan={9}>
                    <div className="flex justify-center"><PuffLoader color="#0aff13" /></div>
                  </td>
                </tr>
              ) : paymentData?.length === 0 ? (

                <tr>
                  <td colSpan={9} className="text-center">No Payments Available</td>
                </tr>
              ) : (
                paymentData?.map((payment: PaymentInterface) => (
                  <tr key={payment.paymentId}>

                    {/* ✅ Booking Id */}
                    <td>{payment.bookingId}</td>

                    {/* ✅ Vehicle Info:*/}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={payment.booking.vehicle?.specification?.vehicleImage}
                              alt="vehicle image"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{payment.booking.vehicle?.specification?.manufacturer}</div>
                          <div className="text-sm opacity-50">{payment.booking.vehicle?.specification?.model}</div>
                        </div>
                      </div>
                    </td>

                    {/* ✅ Number Plate */}
                    <td>{payment.booking.vehicle?.specification?.numberPlate}</td>

                    {/* ✅ pick up  Location*/}
                    <td>{payment.booking.location?.name}</td>

                    {/* ✅ Drop off  Location*/}
                    <td>{payment.booking.location?.name}</td>

                    {/* ✅ Date Booked */}
                    <td>{formatDateRange(payment.booking.bookingDate, payment.booking.returnDate)}</td>

                    {/* ✅ Days Booked */}
                    <td>{calculateDaysBooked(payment.booking.bookingDate, payment.booking.returnDate)}</td>

                    {/* ✅ Total Amount */}
                    <td>Ksh: {payment.booking.totalAmount}</td>

                    {/* ✅ Status with dynamic badge class */}
                    <td>
                      <div className={`badge badge-outline ${getStatusBadge(payment.paymentStatus)}`}>
                        {payment.paymentStatus}
                      </div>
                    </td>


                    {/* ✅ Edit/Delete Action based on status */}
                    <td className="flex gap-1">
                      {
                        payment.paymentStatus === "Cancelled" ? (
                          // 🆕 Show Delete button if status is Cancelled
                          <button
                            className="btn btn-sm btn-outline text-red-700 hover:text-red-500"
                            onClick={() => handleDelete(payment.bookingId)}
                          >
                            Delete
                          </button>
                        ) : (
                          // ✅ Show Edit (Cancel) button otherwise
                          <button
                            className="btn btn-sm btn-outline text-blue-700 hover:text-blue-500"
                            onClick={() => handleEdit(payment.bookingId)}
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



