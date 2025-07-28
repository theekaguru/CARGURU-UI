import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import type { Car } from "../Utils/carData";
import { useCreateBookingMutation } from "../../features/api/bookingApi";
import { useCreatePaymentMutation, useGetPaymentByIdQuery } from "../../features/api/paymentApi";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaMobileAlt, FaMoneyBillWave } from "react-icons/fa";

export const BookNow = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const car: Car = location.state?.car;

  const [createBooking, { isLoading: bookingLoading }] = useCreateBookingMutation();
  const [createPayment, { isLoading: paymentLoading }] = useCreatePaymentMutation();
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string>("pending");
  const [showPaymentPrompt, setShowPaymentPrompt] = useState(false);
  const [calculatedAmount, setCalculatedAmount] = useState<number>(0);

  // Watch form fields to calculate amount
  const pickupDate = watch("pickupDate");
  const returnDate = watch("returnDate");

  // Utility functions for date calculations
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

  // Calculate rental amount when dates change
  useEffect(() => {
    if (pickupDate && returnDate && car?.rentalRate) {
      const days = calculateDaysBooked(pickupDate, returnDate);
      setCalculatedAmount(days * car.rentalRate);
    }
  }, [pickupDate, returnDate, car?.rentalRate]);

  // Poll payment status if paymentId is set
  const { data: paymentData, refetch: refetchPayment } = useGetPaymentByIdQuery(paymentId!, { skip: !paymentId });

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

  const onSubmit = async (data: any) => {
    try {
      const rentalDays = calculateDaysBooked(data.pickupDate, data.returnDate);
      const totalAmount = rentalDays * car.rentalRate;

      // Create booking payload
      const bookingPayload = {
        userId: location.state?.userId || "123",
        vehicleId: car.vehicleId,
        locationId: car.location?.locationId || "789",
        bookingDate: data.pickupDate,
        returnDate: data.returnDate,
        totalAmount: totalAmount,
        bookingStatus: "pending",
      };

      // Create booking
      const bookingRes: any = await createBooking(bookingPayload).unwrap();
      setBookingId(bookingRes.bookingId || bookingRes.id);

      // Format phone number for M-Pesa
      let phoneNumber = data.phoneNumber.trim();
      if (phoneNumber.startsWith("0")) {
        phoneNumber = `254${phoneNumber.substring(1)}`;
      } else if (!phoneNumber.startsWith("254")) {
        phoneNumber = `254${phoneNumber}`;
      }

      // Create payment payload with all booking details
      const paymentPayload = {
        bookingId: bookingRes.bookingId || bookingRes.id,
        userId: bookingPayload.userId,
        amount: totalAmount,
        phoneNumber: phoneNumber,
        vehicleDetails: `${spec.manufacturer} ${spec.model} (${spec.year})`,
        rentalPeriod: formatDateRange(data.pickupDate, data.returnDate),
        location: car.location?.name || "Nairobi",
        days: rentalDays,
        dailyRate: car.rentalRate,
      };

      // Trigger M-Pesa STK push
      const paymentRes: any = await createPayment(paymentPayload).unwrap();
      setPaymentId(paymentRes.paymentId || paymentRes.id);
      setPaymentStatus("pending");
      setShowPaymentPrompt(true);

      reset({
        phoneNumber: data.phoneNumber
      });
    } catch (err) {
      console.error("Booking/payment failed:", err);
      alert("Booking/payment failed ❌. Please try again.");
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

          {calculatedAmount > 0 && (
            <div className="mb-6 p-4 bg-[#b3afad]/30 rounded-lg border border-[#a3a4a1]">
              <div className="flex justify-between items-center">
                <span className="text-[#76726f]">Rental Period:</span>
                <span className="font-semibold">
                  {pickupDate && returnDate
                    ? formatDateRange(pickupDate, returnDate)
                    : '--'}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[#76726f]">Total Days:</span>
                <span className="font-semibold">
                  {pickupDate && returnDate
                    ? calculateDaysBooked(pickupDate, returnDate)
                    : '--'}
                </span>
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#bca16a] mb-1">Pickup Date</label>
              <div className="relative">
                <input
                  type="date"
                  {...register("pickupDate", { required: true })}
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
                  {...register("returnDate", {
                    required: true,
                    validate: (value) => {
                      if (pickupDate && new Date(value) < new Date(pickupDate)) {
                        return "Return date must be after pickup date";
                      }
                      return true;
                    }
                  })}
                  min={pickupDate || new Date().toISOString().split('T')[0]}
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
                  {...register("phoneNumber", {
                    required: true,
                    pattern: {
                      value: /^(07|01|2547|2541|254)\d{8}$/,
                      message: "Please enter a valid Kenyan phone number"
                    }
                  })}
                  className="input input-bordered w-full border px-3 py-2 rounded-lg pl-10 bg-[#b3afad] text-black border-[#a3a4a1] focus:ring-2 focus:ring-[#bca16a]"
                  placeholder="07XXXXXXXX"
                />
                <FaMobileAlt className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#bca16a] via-[#a3a4a1] to-[#666037] text-white w-full py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform disabled:opacity-60"
              disabled={bookingLoading || paymentLoading || !pickupDate || !returnDate}
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
                  <FaMoneyBillWave /> Pay with M-Pesa
                </span>
              )}
            </button>
            <p className="text-xs text-center text-[#d6d4ce] mt-2">
              You'll receive an M-Pesa STK push for Ksh {calculatedAmount || car.rentalRate}
            </p>
          </form>

          {showPaymentPrompt && (
            <div className="mt-6 flex flex-col items-center animate-pulse">
              <div className="w-full max-w-md bg-white/90 p-6 rounded-xl shadow-lg border border-[#bca16a]">
                <h3 className="text-xl font-bold text-center text-[#bca16a] mb-4">
                  Complete Your Payment
                </h3>

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
                    <span className="font-semibold">
                      {pickupDate && returnDate
                        ? formatDateRange(pickupDate, returnDate)
                        : '--'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Days:</span>
                    <span className="font-semibold">
                      {pickupDate && returnDate
                        ? calculateDaysBooked(pickupDate, returnDate)
                        : '--'}
                    </span>
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
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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