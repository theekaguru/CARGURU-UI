import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="relative flex items-center justify-center min-h-[90vh] pt-[var(--header-height)] px-4">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/volxwagen.mp4" type="video/mp4" />
      </video>

      {/* Soft Overlay for readability */}
      <div className="absolute inset-0 bg-black/30 rounded-xl" />

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
          Drive with Style, Ride with Power
        </h1>
        <p className="text-lg md:text-xl mb-8 text-white/80 font-light drop-shadow-sm">
          Book your luxury experience now. Effortless, elegant, and unforgettable.
        </p>
        <Link
          to="/register"
          className="px-6 py-3 rounded-lg bg-[#b4a125] text-black font-semibold hover:bg-[#d1b737] transition duration-300 shadow-md"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};
