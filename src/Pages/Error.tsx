import { Link } from "react-router-dom";

const customStyles = `
  @keyframes spin-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .animate-spin-slow { animation: spin-slow 12s linear infinite; }

  @keyframes revolve {
    0% { transform: rotate(0deg) translateX(300px) rotate(0deg); }
    100% { transform: rotate(360deg) translateX(300px) rotate(-360deg); }
  }
  .animate-revolve {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: center;
    animation: revolve 20s linear infinite;
  }
`;

export const Error = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C1729] via-[#1D3C6E] to-[#2D4974] flex flex-col items-center justify-center relative overflow-hidden px-4">
      <style>{customStyles}</style>

      {/* Main content */}
      <div className="text-center z-10">
        <div className="text-[6rem] md:text-[9rem] font-extrabold flex justify-center items-center gap-4 select-none drop-shadow-lg text-white">
          <span>4</span>
          <img
            src="/planet.png"
            alt="planet"
            className="w-24 h-24 md:w-40 md:h-40 animate-spin-slow"
          />
          <span>4</span>
        </div>

        <p className="mt-4 text-3xl md:text-4xl font-bold text-[#6896C0] animate-pulse">Oops!</p>
        <p className="text-white/80 text-lg md:text-xl mb-6">
          We couldn’t find the page you’re looking for.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link
            to="/"
            className="px-6 py-2 text-lg font-semibold rounded-full bg-[#6896C0] text-white hover:bg-[#1D3C6E] transition-all shadow-md hover:shadow-xl"
          >
            Run 🏃 Back Home
          </Link>
          <Link
            to="/contact"
            className="px-6 py-2 text-lg font-semibold rounded-full bg-[#1D3C6E] text-white hover:bg-[#6896C0] transition-all shadow-md hover:shadow-xl"
          >
            Contact Us 📬
          </Link>
        </div>
      </div>

      {/* Orbiting images */}
      {[
        { src: "/astronaut.png", size: "w-20 md:w-28", delay: "0s" },
        { src: "/space-ship.jpg", size: "w-16 md:w-20", delay: "4s" },
        { src: "/rocket.png", size: "w-24 md:w-32", delay: "8s" },
        { src: "/Ring-Planet.png", size: "w-16 md:w-24", delay: "12s" },
        { src: "/ufo-alien.png", size: "w-24 md:w-32", delay: "16s" },
      ].map((item, index) => (
        <div key={index} className="animate-revolve" style={{ animationDelay: item.delay, zIndex: 1 }}>
          <img src={item.src} alt="orbit-item" className={`${item.size} animate-spin-slow`} />
        </div>
      ))}
    </div>
  );
};
