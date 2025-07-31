export const ContactUs = () => {
  return (
    <div className="relative flex justify-center items-start min-h-screen pt-[var(--header-height)] bg-[#0C1729]">
      {/* Background Video */}
      <video
        className="absolute left-[5%] w-[90vw] h-full object-cover rounded-lg"
        style={{ top: 0 }}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/volxwagen.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay */}
      <div className="absolute left-[5%] w-[90vw] h-full bg-black/50 z-10 rounded-lg"></div>

      {/* Main content */}
      <div className="relative z-20 w-full flex justify-center items-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-white">

          {/* Back to Home */}
          <div className="mb-8">
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 bg-[#1D3C6E]/60 hover:bg-[#6896C0]/60 text-white rounded-lg transition duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Back to Home
            </a>
          </div>

          {/* Header */}
          <div className="text-center lg:text-left mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get in Touch</h1>
            <p className="text-base sm:text-lg text-[#C5D1E3] max-w-3xl mx-auto lg:mx-0">
              Whether you're looking to rent or just have questions, we’re here to help.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-[#2D4974] p-6 sm:p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-[#6896C0]">Send us a Message</h2>
              <p className="mb-8 text-white/80">We’ll respond within 24 hours.</p>

              <form className="space-y-6">
                {[
                  { label: "Full Name", id: "full-name", type: "text", required: true, placeholder: "Your full name" },
                  { label: "Phone", id: "phone", type: "tel", required: false, placeholder: "Phone number" },
                  { label: "Email", id: "email", type: "email", required: true, placeholder: "Email address" },
                  { label: "Subject", id: "subject", type: "text", required: true, placeholder: "Subject of inquiry" },
                ].map(({ label, id, type, required, placeholder }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-sm font-medium mb-1">
                      {label} {required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      id={id}
                      type={type}
                      required={required}
                      placeholder={placeholder}
                      className="w-full px-4 py-3 rounded-lg bg-[#1F1E1C] text-white border border-[#6896C0]/30 focus:ring-2 focus:ring-[#6896C0] outline-none"
                    />
                  </div>
                ))}

                {/* Inquiry Type */}
                <div>
                  <label htmlFor="inquiry-type" className="block text-sm font-medium mb-1">Inquiry Type *</label>
                  <select
                    id="inquiry-type"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#1F1E1C] text-white border border-[#6896C0]/30 focus:ring-2 focus:ring-[#6896C0] outline-none"
                  >
                    <option value="">Select type</option>
                    <option value="booking">Booking</option>
                    <option value="support">Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message *</label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    placeholder="Write your message..."
                    className="w-full px-4 py-3 rounded-lg bg-[#1F1E1C] text-white border border-[#6896C0]/30 focus:ring-2 focus:ring-[#6896C0] outline-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-[#6896C0] hover:bg-[#1D3C6E] text-white font-medium py-3 px-6 rounded-lg transition duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-[#2D4974] p-6 sm:p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-[#6896C0]">Contact Information</h2>
                <p className="mb-6 text-white/80">We’re available on the following channels:</p>

                <div className="space-y-6 text-sm">
                  <div>
                    <h3 className="font-semibold text-white">🏢 Head Office</h3>
                    <p>123 Motor Ave<br />Downtown, Nairobi</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">📞 Phone</h3>
                    <p>+254 712 345 678<br />1-800-CARGURU</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">📧 Email</h3>
                    <p>info@carguru.com<br />support@carguru.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1D3C6E] rounded-xl p-6 text-white text-center shadow-md">
                <h3 className="text-lg sm:text-xl font-bold mb-2">🚨 24/7 Emergency Support</h3>
                <p className="mb-3">Call us anytime — we’re here for you on the road.</p>
                <button className="bg-white text-[#1D3C6E] hover:bg-[#6896C0] font-medium py-2 px-4 rounded-lg transition">
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
