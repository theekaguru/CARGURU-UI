import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="hero relative flex justify-center items-start min-h-[75vh] pt-[var(--header-height)]">
      {/* Background Video */}
      <video
        className="absolute left-[10%] w-[80vw] h-[75vh] object-cover rounded-lg mb-8"
        style={{ top: 0 }}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/volxwagen.mp4" type="video/mp4" /></video>

      {/* Overlay */}
      <div className="hero-overlay bg-black/35 absolute left-[10%] w-[80vw] h-[75vh] z-10 rounded-lg mb-8"></div>

      {/* Content */}
      <div className="hero-content text-neutral-content text-center relative z-20 w-full flex justify-center items-center" style={{ minHeight: "75vh" }}>
        <div className="max-w-md">
          <h1 className="text-[#76726f] mb-5 text-5xl font-bold">Hello there</h1>
          <Link to="/register" className=" text-[#b4a125] btn btn-primary">Book Now</Link>
        </div>
      </div>
    </div>
  );
};