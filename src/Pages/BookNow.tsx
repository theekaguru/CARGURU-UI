import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { useCreateBookingMutation } from "../features/api/bookingApi";
import {
  useCreatePaymentSessionMutation,
  useGetPaymentByIdQuery,
} from "../features/api/paymentApi";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { vehicleApi } from "../features/api/vehicleApi";

export const BookNow = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user.userId;
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: car } = vehicleApi.useGetVehicleByIdQuery(id);

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [createBooking, { isLoading: bookingLoading }] = useCreateBookingMutation();
  const [createPaymentSession , { isLoading: paymentLoading }] = useCreatePaymentSessionMutation();

  const [paymentId] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [showPaymentPrompt, setShowPaymentPrompt] = useState(false);
  const [calculatedAmount, setCalculatedAmount] = useState(0);

  const { data: paymentData, refetch: refetchPayment } = useGetPaymentByIdQuery(paymentId!, {
    skip: !paymentId,
  });

  const calculateDaysBooked = (start: string, end: string): number => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  const formatDateRange = (start: string, end: string): string => {
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

  useEffect(() => {
    if (pickupDate && returnDate && car?.rentalRate) {
      const days = calculateDaysBooked(pickupDate, returnDate);
      setCalculatedAmount(days * car.rentalRate);
    }
  }, [pickupDate, returnDate, car?.rentalRate]);

  useEffect(() => {
    if (paymentData) {
      setPaymentStatus(paymentData.status);
      if (paymentData.status === "success") {
        setShowPaymentPrompt(false);
      }
    }
    let interval: ReturnType<typeof setInterval>;
    if (paymentId && paymentStatus === "pending") {
      interval = setInterval(() => {
        refetchPayment();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [paymentId, paymentStatus, paymentData, refetchPayment]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!pickupDate || !returnDate || !/^07\d{8}$/.test(phoneNumber)) {
      alert("Please fill all fields correctly.");
      return;
    }
    try {
      const bookingRes = await createBooking({
        userId,
        vehicleId: car.vehicleId,
        locationId: car.locationId,
        bookingDate: pickupDate,
        returnDate,
        totalAmount: calculatedAmount,
        bookingStatus: "Pending",
      }).unwrap();

      const newBookingId = bookingRes.bookingId;
      setBookingId(newBookingId);

      const paymentRes = await createPaymentSession({
        bookingId: newBookingId,
        amount: calculatedAmount,
      }).unwrap();

      if (paymentRes.url) {
        window.location.href = paymentRes.url;
      } else {
        alert("Failed to start payment");
      }
    } catch (error) {
      console.error("Error during booking or payment:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#888372] via-[#a3a4a1] to-[#160d0b] flex items-center justify-center py-10 px-2">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 shadow-2xl rounded-3xl bg-white/70 backdrop-blur-lg p-0 md:p-6 border border-[#a3a4a1]">
        <div className="flex-1 bg-[#f5f4f2]/90 rounded-3xl shadow-xl p-8 border border-[#a3a4a1] flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2 text-[#76726f] text-center">
            <span className="text-3xl text-[#bca16a] font-extrabold">Ksh {car.rentalRate}</span>
            <span className="text-base text-[#a3a4a1] font-normal"> / day</span>
          </h2>

          {calculatedAmount > 0 && (
            <div className="mb-6 p-4 bg-[#b3afad]/30 rounded-lg border border-[#a3a4a1]">
              <div className="flex justify-between items-center">
                <span className="text-[#76726f]">Rental Period:</span>
                <span className="font-semibold">{formatDateRange(pickupDate, returnDate)}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[#76726f]">Total Days:</span>
                <span className="font-semibold">{calculateDaysBooked(pickupDate, returnDate)}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[#76726f]">Daily Rate:</span>
                <span className="font-semibold">Ksh {car.rentalRate}</span>
              </div>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#a3a4a1]">
                <span className="text-[#76726f] font-bold">Total Amount:</span>
                <span className="text-xl text-[#bca16a] font-bold">Ksh {calculatedAmount}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#bca16a] mb-1">Pickup Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="input input-bordered w-full border px-3 py-2 rounded-lg pl-10 bg-[#b3afad] text-black border-[#a3a4a1] focus:ring-2 focus:ring-[#bca16a]"
                />
                <FaCalendarAlt className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#bca16a] mb-1">Return Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={pickupDate || new Date().toISOString().split('T')[0]}
                  className="input input-bordered w-full border px-3 py-2 rounded-lg pl-10 bg-[#b3afad] text-black border-[#a3a4a1] focus:ring-2 focus:ring-[#bca16a]"
                />
                <FaCalendarAlt className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#bca16a] mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="e.g. 0712345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="input input-bordered w-full border px-3 py-2 rounded-lg bg-[#b3afad] text-black border-[#a3a4a1] focus:ring-2 focus:ring-[#bca16a]"
              />
            </div>

            <button
              type="submit"
              disabled={
                bookingLoading ||
                paymentLoading ||
                !pickupDate ||
                !returnDate ||
                !/^07\d{8}$/.test(phoneNumber)
              }
              className="bg-gradient-to-r from-[#bca16a] via-[#a3a4a1] to-[#666037] text-white w-full py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform disabled:opacity-60"
            >
              {bookingLoading || paymentLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FaMoneyBillWave />
                  Book
                </span>
              )}
            </button>

            <p className="text-xs text-center text-[#d6d4ce] mt-2">
              You'll receive an M-Pesa STK push for Ksh {calculatedAmount || car.rentalRate}
            </p>
          </form>

          {/* Payment Prompt */}
          {showPaymentPrompt && (
            <div className="mt-6 flex flex-col items-center animate-pulse">
              <div className="w-full max-w-md bg-white/90 p-6 rounded-xl shadow-lg border border-[#bca16a]">
                <h3 className="text-xl font-bold text-center text-[#bca16a] mb-4">Complete Your Payment</h3>
                {bookingId && (
                  <div className="mb-4 text-center">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      Booking ID: {bookingId}
                    </span>
                  </div>
                )}
                <div className="space-y-3 text-sm text-[#76726f]">
                  <div className="flex justify-between">
                    <span>Vehicle:</span>
                    <span className="font-semibold">{spec.manufacturer} {spec.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rental Period:</span>
                    <span className="font-semibold">{formatDateRange(pickupDate, returnDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Days:</span>
                    <span className="font-semibold">{calculateDaysBooked(pickupDate, returnDate)}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#a3a4a1] pt-2">
                    <span>Amount Due:</span>
                    <span className="text-lg font-bold text-[#bca16a]">Ksh {calculatedAmount}</span>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${paymentStatus === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : paymentStatus === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                    {paymentStatus === "pending" && (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-yellow-500" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Awaiting M-Pesa payment...
                      </>
                    )}
                    {paymentStatus === "success" && (
                      <>
                        <svg className="-ml-1 mr-2 h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Payment confirmed!
                      </>
                    )}
                    {paymentStatus === "failed" && (
                      <>
                        <svg className="-ml-1 mr-2 h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Payment failed. Please try again.
                      </>
                    )}
                  </div>
                  {paymentStatus === "pending" && (
                    <p className="mt-3 text-xs text-[#76726f]">
                      Check your phone for an M-Pesa STK push notification to complete payment.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};