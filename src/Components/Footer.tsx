export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-sky-700 to-indigo-700 text-white px-4 py-6 text-sm backdrop-blur-sm shadow-md">
      <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 text-center text-xs sm:text-sm">
        <a className="hover:underline hover:text-sky-200 transition cursor-pointer">About</a>
        <a className="hover:underline hover:text-sky-200 transition cursor-pointer">Contact</a>
        <a className="hover:underline hover:text-sky-200 transition cursor-pointer">Jobs</a>
        <a className="hover:underline hover:text-sky-200 transition cursor-pointer">Press</a>
      </nav>

      <div className="flex justify-center gap-4 mb-4">
        <a className="hover:text-sky-300 transition" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="sm:w-5 sm:h-5">
            <path d="M24 4.557c-.883.392-1.832.656-2.828..."></path>
          </svg>
        </a>
        <a className="hover:text-sky-300 transition" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="sm:w-5 sm:h-5">
            <path d="M19.615 3.184c-3.604-.246-11.631..."></path>
          </svg>
        </a>
        <a className="hover:text-sky-300 transition" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="sm:w-5 sm:h-5">
            <path d="M9 8h-3v4h3v12h5v-12h3.642..."></path>
          </svg>
        </a>
      </div>

      <aside className="text-white/70 text-center text-xs sm:text-sm">
        <p>© {new Date().getFullYear()} Levi It to Us™. All rights reserved.</p>
      </aside>
    </footer>
  );
};
