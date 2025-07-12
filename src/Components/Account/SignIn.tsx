import { Anim } from './Anim';
import vw1 from '../../assets/Account/vw1.jpg';

export const SignIn = () => {
  return (
    <div className=" p-20 flex justify-center items-center ">
      <Anim />
      {/* Main SignIn Card */}
      <div className=" z-10 grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-[#a3a4a1]">
        {/* Left Side Image */}
        <div
          className="hidden md:flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${vw1})` }}
        >
        </div>
        {/* Right Side Form */}
        <form className="p-8  space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
              Welcome to CarGuru!
            </h2>
            <p className="text-[#d6d4ce] text-base font-medium">
              Log in to start your engine
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#c2c0ba]">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="e.g. you@example.com"
                className="w-full h-12 px-4 rounded-lg border bg-white/70 text-[#160d0b] placeholder-[#a3a4a1] border-[#bca16a] focus:border-[#888372] shadow-inner focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#b9b7af]">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full h-12 px-4 rounded-lg border bg-white/70 text-[#3c3e1f] placeholder-[#a3a4a1] border-[#bca16a] focus:border-[#888372] shadow-inner focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 text-lg font-bold text-white rounded-md bg-gradient-to-r from-[#bca16a] via-[#a3a4a1] to-[#666037] hover:scale-105 hover:shadow-xl transition-transform shadow-lg"
            >
              Log In
            </button>
          </div>
          <div className="flex flex-col items-center mt-4 gap-2 text-sm">
            <a href="/forgotpassword" className="text-[#bca16a] hover:underline">Forgot password?</a>
            <a href="/register" className="text-[#160d0b] hover:underline">Need an account? Register</a>
            <a href="/" className="text-[#888372] hover:underline">HomePage</a>
          </div>
        </form>
      </div>
    </div>
  );
};
