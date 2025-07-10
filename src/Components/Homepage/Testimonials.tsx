import { Star } from "lucide-react";

export const Testimonials = () => {
  return (
    <div className="py-12 px-4 bg-base-200">
      <h2 className="text-4xl font-bold text-center mb-10">What Our Users Say</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Testimonial 1 */}
        <div className="card bg-white shadow-xl p-6 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="avatar">
              <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://i.pravatar.cc/100?img=12" alt="User Avatar" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Sarah M.</h3>
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" stroke="none" />
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-600">
            CarGuru has transformed how I book my rides. The experience is smooth, professional, and fast!
          </p>
        </div>

        {/* Testimonial 2 */}
        <div className="card bg-white shadow-xl p-6 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="avatar">
              <div className="w-14 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                <img src="https://i.pravatar.cc/100?img=5" alt="User Avatar" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">David K.</h3>
              <div className="flex text-yellow-500">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" stroke="none" />
                ))}
                <Star size={16} className="text-gray-300" />
              </div>
            </div>
          </div>
          <p className="text-gray-600">
            I love how easy it is to get a ride with CarGuru. Clean cars, good prices, and great drivers.
          </p>
        </div>

        {/* Testimonial 3 */}
        <div className="card bg-white shadow-xl p-6 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="avatar">
              <div className="w-14 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
                <img src="https://i.pravatar.cc/100?img=20" alt="User Avatar" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Linda W.</h3>
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" stroke="none" />
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-600">
            The best car hire service I’ve ever used. Booking was fast, and the support team is amazing!
          </p>
        </div>
      </div>
    </div>
  );
};
