import { Link } from "react-router-dom"

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
    <div className="min-h-screen bg-gradient-to-br from-[#888372] via-[#a3a4a1] to-[#160d0b] flex flex-col items-center justify-center relative overflow-hidden px-4">
      <style>{customStyles}</style>

      <div className="text-center z-10">
        <div className="text-[6rem] md:text-[9rem] font-extrabold flex justify-center items-center gap-4 select-none drop-shadow-lg">
          <span>4</span>
          <img
            src="/planet.png"
            alt="planet"
            className="w-24 h-24 md:w-40 md:h-40 animate-spin-slow"
          />
          <span>4</span>
        </div>
        <p className=" mt-4 text-3xl font-bold bg-clip-text  animate-pulse">Oops!</p>
        <p className="text-gray-300 text-lg md:text-xl mb-6">We couldn’t find the page you’re looking for.</p>

        <div className="flex flex-row items-center justify-center gap-4 mt-4">
          <Link
            to="/"
            className="px-6 py-2 text-lg font-semibold rounded-full text-white  bg-gradient-to-r from-[#bca16a] via-[#a3a4a1] to-[#666037] hover:scale-105 hover:shadow-xl transition-transform shadow-lg"
          >
            Run 🏃Back Home 
          </Link>
          <Link
            to="/contact"
            className="px-6 py-2 text-lg font-semibold rounded-full text-white  bg-gradient-to-r from-[#bca16a] via-[#a3a4a1] to-[#666037] hover:scale-105 hover:shadow-xl transition-transform shadow-lg"
          >
            Contact Us 📬
          </Link>
        </div>
      </div>

      <div className="animate-revolve" style={{ animationDelay: "0s", zIndex: 1 }}>
        <img src="/astronaut.png" alt="astronaut" className="w-20 md:w-28 animate-spin-slow" />
      </div>
      <div className="animate-revolve" style={{ animationDelay: "4s", zIndex: 1 }}>
        <img src="/space-ship.jpg" alt="spaceship" className="w-16 md:w-20 animate-spin-slow" />
      </div>
      <div className="animate-revolve" style={{ animationDelay: "8s", zIndex: 1 }}>
        <img src="/rocket.png" alt="rocket" className="w-24 md:w-32 animate-spin-slow" />
      </div>
      <div className="animate-revolve" style={{ animationDelay: "12s", zIndex: 1 }}>
        <img src="/Ring-Planet.png" alt="ring-planet" className="w-16 md:w-24 animate-spin-slow" />
      </div>
      <div className="animate-revolve" style={{ animationDelay: "16s", zIndex: 1 }}>
        <img src="/ufo-alien.png" alt="ufo-alien" className="w-24 md:w-32 animate-spin-slow" />
      </div>
    </div>
  )
}
