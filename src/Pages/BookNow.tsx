// src/pages/BookNow.tsx

import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import type { Car } from "../Utils/carData"
import { useCreateBookingMutation } from "../../features/api/bookingApi";
import { useCreatePaymentMutation, useGetPaymentByIdQuery } from "../../features/api/paymentApi";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaMobileAlt } from "react-icons/fa";

export const BookNow = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const car: Car = location.state?.car;

  const [createBooking, { isLoading: bookingLoading }] = useCreateBookingMutation();
  const [createPayment, { isLoading: paymentLoading }] = useCreatePaymentMutation();
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [showPaymentPrompt, setShowPaymentPrompt] = useState(false);

  // Poll payment status if paymentId is set
  const { data: paymentData, refetch: refetchPayment } = useGetPaymentByIdQuery(paymentId!, { skip: !paymentId });

  useEffect(() => {
    if (paymentData) {
      setPaymentStatus(paymentData.status);
      if (paymentData.status !== "pending") {
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
      // Create booking
      const bookingRes: any = await createBooking(payload).unwrap();
      setBookingId(bookingRes.bookingId || bookingRes.id);
      // Trigger payment (Mpesa STK push)
      const paymentPayload = {
        bookingId: bookingRes.bookingId || bookingRes.id,
        userId: payload.userId,
        amount: car.rentalRate,
        phoneNumber: data.phoneNumber, // Add phone number field to form
      };
      const paymentRes: any = await createPayment(paymentPayload).unwrap();
      setPaymentId(paymentRes.paymentId || paymentRes.id);
      setShowPaymentPrompt(true);
      alert("Booking created. Please complete payment on your phone.");
      reset();
    } catch (err) {
      console.error("Booking/payment failed:", err);
      alert("Booking/payment failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#888372] via-[#a3a4a1] to-[#160d0b] flex items-center justify-center py-10 px-2">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 shadow-2xl rounded-3xl bg-white/70 backdrop-blur-lg p-0 md:p-6 border border-[#a3a4a1]">
        {/* Car Preview Card */}
        <div className="flex-1 flex flex-col items-center justify-center bg-[#f5f4f2]/80 rounded-3xl p-6 shadow-lg">
          <img
            src={spec.vehicleImage}
            alt={`${spec.manufacturer} ${spec.model}`}
            className="rounded-2xl shadow-xl w-full h-64 object-cover border-4 border-blue-100"
          />
          <h2 className="text-3xl font-extrabold mt-6 text-[#76726f] tracking-tight text-center">
            {spec.manufacturer} {spec.model}
          </h2>
          <p className="text-lg text-[#bca16a] text-center">{spec.year}</p>
          <div className="flex gap-3 mt-4 flex-wrap justify-center">
            <div className="bg-[#b3afad] text-[#160d0b] px-3 py-1 rounded-full text-sm font-semibold shadow">{spec.seatingCapacity} Seats</div>
            <div className="bg-[#b3afad] text-[#160d0b] px-3 py-1 rounded-full text-sm font-semibold shadow">{spec.fuelType}</div>
            <div className="bg-[#b3afad] text-[#160d0b] px-3 py-1 rounded-full text-sm font-semibold shadow">{spec.transmission}</div>
            <div className="bg-[#b3afad] text-[#160d0b] px-3 py-1 rounded-full text-sm font-semibold shadow">{car.location?.name}</div>
          </div>
          <h3 className="mt-8 font-bold text-[#bca16a]">Description</h3>
          <p className="text-sm text-[#76726f] mt-1 text-center">
            {car.description || "No description available."}
          </p>
          <h3 className="mt-6 font-bold text-[#bca16a]">Features</h3>
          <ul className="grid grid-cols-2 gap-2 text-sm text-[#76726f] mt-2">
            {spec.features?.split(",").map((feature, idx) => (
              <li key={idx} className="flex items-center gap-1">
                <span className="text-green-500 font-bold">✓</span> {feature.trim()}
              </li>
            ))}
          </ul>
        </div>
        {/* Booking Form Card */}
        <div className="flex-1 bg-[#f5f4f2]/90 rounded-3xl shadow-xl p-8 border border-[#a3a4a1] flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2 text-[#76726f] text-center">
            <span className="text-3xl text-[#bca16a] font-extrabold">Ksh {car.rentalRate}</span>
            <span className="text-base text-[#a3a4a1] font-normal"> / day</span>
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-[#bca16a] mb-1">Pickup Date</label>
              <div className="relative">
                <input
                  type="date"
                  {...register("pickupDate", { required: true })}
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
                  {...register("returnDate", { required: true })}
                  className="input input-bordered w-full border px-3 py-2 rounded-lg pl-10 bg-[#b3afad] text-black border-[#a3a4a1] focus:ring-2 focus:ring-[#bca16a]"
                />
                <FaCalendarAlt className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#bca16a] mb-1">Phone Number (Mpesa)</label>
              <div className="relative">
                <input
                  type="tel"
                  {...register("phoneNumber", { required: true })}
                  className="input input-bordered w-full border px-3 py-2 rounded-lg pl-10 bg-[#b3afad] text-black border-[#a3a4a1] focus:ring-2 focus:ring-[#bca16a]"
                  placeholder="07XXXXXXXX"
                />
                <FaMobileAlt className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#bca16a] via-[#a3a4a1] to-[#666037] text-white w-full py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform disabled:opacity-60"
              disabled={bookingLoading || paymentLoading}
            >
              {bookingLoading || paymentLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                  Processing...
                </span>
              ) : (
                "Book Now"
              )}
            </button>
            <p className="text-xs text-center text-[#d6d4ce] mt-2">No credit card required to reserve</p>
          </form>
          {showPaymentPrompt && (
            <div className="mt-6 flex flex-col items-center">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg mb-2 ${paymentStatus === "pending" ? "bg-[#f5e9c6] text-[#bca16a]" : paymentStatus === "success" ? "bg-[#d6d4ce] text-[#160d0b]" : "bg-red-100 text-red-700"}`}>
                Payment Status: {paymentStatus || "pending"}
              </span>
              {paymentStatus === "pending" && (
                <span className="text-[#bca16a] text-sm">Please complete the Mpesa payment on your phone.</span>
              )}
              {paymentStatus === "success" && (
                <span className="text-[#160d0b] text-sm font-bold">Payment successful! Your booking is confirmed.</span>
              )}
              {paymentStatus && paymentStatus !== "pending" && paymentStatus !== "success" && (
                <span className="text-red-700 text-sm font-bold">Payment failed or cancelled. Please try again.</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
