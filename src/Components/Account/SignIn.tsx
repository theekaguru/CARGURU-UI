
export const SignIn = () => {
 return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-400 to-gray-700 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 flex items-center justify-center py-10 overflow-hidden">
      <div className="relative z-10 grid sm:grid-cols-2 gap-10 rounded-3xl overflow-hidden w-full max-w-5xl">
        {/* Left Panel: Animated gradient and glowing lock icon */}
        <div className="hidden sm:flex items-center justify-center bg-gradient-to-br from-blue-400/60 via-purple-400/40 to-pink-300/60 dark:from-blue-900/70 dark:via-purple-900/60 dark:to-pink-900/70 p-0 animate-pulse-slow">
          <div className="relative w-80 h-56 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-center items-center p-6 backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/30 dark:border-gray-700/40">
            {/* Glowing Lock Icon */}
            <svg width="54" height="54" viewBox="0 0 54 54" fill="none" className="mb-4 drop-shadow-glow">
              <circle cx="27" cy="27" r="25" fill="url(#glow)" />
              <rect x="17" y="26" width="20" height="14" rx="4" fill="#fff" fillOpacity="0.15" stroke="#fff" strokeWidth="2" />
              <rect x="21" y="18" width="12" height="12" rx="6" fill="#fff" fillOpacity="0.25" stroke="#fff" strokeWidth="2" />
              <circle cx="27" cy="33" r="2" fill="#fff" />
              <defs>
                <radialGradient id="glow" cx="0" cy="0" r="1" gradientTransform="translate(27 27) scale(25)" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a5b4fc" />
                  <stop offset="1" stopColor="#f472b6" stopOpacity="0.3" />
                </radialGradient>
              </defs>
            </svg>
            <span className="text-2xl font-semibold text-white drop-shadow-lg text-center tracking-wide">Secure Access</span>
            <span className="text-base text-white/80 text-center mt-1">Welcome back to your private session</span>
          </div>
        </div>
        {/* Form Section: Glassmorphism card */}
        <div className="flex items-center justify-center p-8">
          <form className="w-full max-w-md space-y-6 rounded-2xl p-8 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/30 dark:border-gray-700/40 shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-4xl font-extrabold tracking-tight mb-2 text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent drop-shadow-lg font-serif animate-gradient-x">
                Log In to Continue
              </div>
              <p className="text-gray-700 dark:text-gray-200 text-lg font-medium">Access your personalized experience</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold leading-none text-gray-700 dark:text-gray-200" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="flex h-12 w-full rounded-lg border bg-white/60 dark:bg-gray-800/60 px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-400 border-blue-300 focus:border-blue-500 shadow-inner focus:outline-none transition"
                  type="email"
                  id="email"
                  placeholder="e.g. you@example.com"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold leading-none text-gray-700 dark:text-gray-200" htmlFor="password">
                  Password
                </label>
                <input
                  className="flex h-12 w-full rounded-lg border bg-white/60 dark:bg-gray-800/60 px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-400 border-blue-300 focus:border-blue-500 shadow-inner focus:outline-none transition"
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-info btn-block mt-8 shadow-lg hover:scale-105 hover:shadow-xl transition-transform text-lg font-bold tracking-wide py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 border-0 text-white"
              >
                Log In
              </button>
            </div>
            <div className="flex flex-col items-center mt-4 gap-2">
              <a href="/forgotpassword" className="text-blue-500 hover:underline text-sm">Forgot password?</a>
              <a href="/register" className="text-pink-500 hover:underline text-sm">Need an account? Register</a>
              <a href="/" className="text-blue-400 hover:underline text-sm">Go to HomePage</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
