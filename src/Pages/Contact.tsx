export const Contact = () => {
  return (
    <div className="relative flex justify-center items-start min-h-screenpt-[var(--header-height)]">
      {/* Background Video */}
      <video className="absolute left-[10%] w-[80vw] h-[100%] object-cover rounded-lg mb-8"
        style={{ top: 0 }}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/volxwagen.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute left-[10%] w-[80vw] h-full bg-black/40 z-10 rounded-lg mb-8"></div>

      {/* Content */}
      <div className="relative z-20 w-full flex justify-center items-center" style={{ minHeight: "100%" }}>
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-white">
          {/* Home Button */}
          <div className="mb-8">
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Back to Home
            </a>
          </div>

          {/* Hero Text */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Ready to hit the road? Contact CARGURU for reliable car hire services.
              We're here to make your journey smooth and hassle-free.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="bg-gradient-to-br from-[#888372] via-[#a3a4a1] to-[#504118] rounded-xl shadow-xl p-8 hover:scale-[1.01] transition-transform duration-300 text-white">

                <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
                <p className="mb-8 text-white/80">
                  Fill out the form below and we'll respond within 24 hours
                </p>

                <form className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="full-name" className="block text-sm font-medium mb-1">
                      Full Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="full-name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label htmlFor="inquiry-type" className="block text-sm font-medium mb-1">
                      Inquiry Type<span className="text-red-500">*</span>
                    </label>
                    <select
                      id="inquiry-type"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select inquiry type</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="support">Customer Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Subject<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message<span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                      placeholder="Please provide details about your inquiry..."
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

            {/* Contact Info */}
            <div className="space-y-8 text-white">
              <div className="bg-gradient-to-br from-[#888372] via-[#a3a4a1] to-[#504118] rounded-xl shadow-xl p-8 hover:scale-[1.01] transition-transform duration-300 text-white">
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                <p className="mb-6 text-white/80">Reach out to us through any of these channels</p>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Head Office</h3>
                    <p>123 Motor Avenue<br />Downtown Business District<br />City, State 12345</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Phone Numbers</h3>
                    <p>Emergency: <span className="font-semibold">+1 (555) 987-6543</span><br />Toll-free: <span className="font-semibold">1-800-CARGURU</span></p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Emails</h3>
                    <p>General: info@carguru.com<br />Bookings: bookings@carguru.com<br />Support: support@carguru.com</p>
                  </div>
                </div>
              </div>

              {/* Optional emergency block */}
              <div className="bg-red-600 rounded-xl p-6 text-white text-center">
                <h3 className="text-xl font-bold mb-2">24/7 Emergency Support</h3>
                <p className="mb-3">Need immediate help? Call our emergency line.</p>
                <button className="bg-white text-red-600 font-medium py-2 px-4 rounded-lg">
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};