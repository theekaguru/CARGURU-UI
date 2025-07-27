export const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Ready to hit the road? Contact CARGURU for reliable car hire services.
          We're here to make your journey smooth and hassle-free.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Contact Form */}
        <div>
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below and we'll respond within 24 hours
            </p>

            <form className="space-y-6">
              <div>
                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="full-name"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="inquiry-type" className="block text-sm font-medium text-gray-700 mb-1">
                  Inquiry Type<span className="text-red-500">*</span>
                </label>
                <select
                  id="inquiry-type"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select inquiry type</option>
                  <option value="booking">Booking Inquiry</option>
                  <option value="support">Customer Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  placeholder="Brief description of your inquiry"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Please provide details about your inquiry..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Right Column - Contact Information */}
        <div className="space-y-8">
          {/* Contact Information Card */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h2>
            <p className="text-gray-600 mb-6">Reach out to us through any of these channels</p>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Head Office</h3>
                <p className="text-gray-600">
                  123 Motor Avenue<br />
                  Downtown Business District<br />
                  City, State 12345
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Phone Numbers</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Emergency: <span className="font-semibold">+1 (555) 987-6543</span></li>
                  <li>Toll-free: <span className="font-semibold">1-800-CARGURU</span></li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Email Addresses</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>General: <span className="font-semibold">info@carguru.com</span></li>
                  <li>Bookings: <span className="font-semibold">bookings@carguru.com</span></li>
                  <li>Support: <span className="font-semibold">support@carguru.com</span></li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Business Hours</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Mon - Fri: <span className="font-semibold">6:00 AM - 10:00 PM</span></li>
                  <li>Saturday: <span className="font-semibold">7:00 AM - 9:00 PM</span></li>
                  <li>Sunday: <span className="font-semibold">8:00 AM - 8:00 PM</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Why Choose CARGURU?</h2>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-xl text-blue-800 mb-2">500+ Vehicles</h3>
                <p className="text-gray-600">Modern fleet available</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-xl text-green-800 mb-2">100% Insured</h3>
                <p className="text-gray-600">Full coverage protection</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-xl text-purple-800 mb-2">50K+ Customers</h3>
                <p className="text-gray-600">Trusted by thousands</p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-bold text-xl text-yellow-800 mb-2">Award Winning</h3>
                <p className="text-gray-600">Best service 2024</p>
              </div>
            </div>

            <div className="mt-6 bg-red-50 p-4 rounded-lg">
              <h3 className="font-bold text-xl text-red-800 mb-2">24/7 Emergency Support</h3>
              <p className="text-gray-600 mb-3">Need immediate assistance?</p>
              <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
                Call Emergency Line
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Locations Section */}
      <div className="mt-16 bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Find Our Locations</h2>
        <p className="text-gray-600 mb-8">
          Visit any of our convenient locations across the city
        </p>

        <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
          <p className="text-gray-500">Interactive Map integration would be implemented here</p>
        </div>
      </div>
    </div>
  );
};