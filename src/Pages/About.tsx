import { Footer } from "../Components/Footer"
import { Navbar } from "../Components/Navbar"

export const About = () => {
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen pt-[var(--header-height)] bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">About CARGURU</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Driving excellence in car rental services since 2010
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-5xl mx-auto space-y-16">
            {/* Our Story */}
            <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-semibold mb-6 text-center">Our Story</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded in 2010, CARGURU began as a small family-owned business with just five vehicles.
                  What started as a local service in downtown has now grown into a nationwide network of
                  premium car rental solutions.
                </p>
                <p>
                  Our journey has been fueled by a passion for automotive excellence and an unwavering
                  commitment to customer satisfaction. Today, we operate in over 50 cities across the country,
                  with a fleet of more than 10,000 vehicles.
                </p>
                <p>
                  The name "CARGURU" reflects our philosophy - we're not just rental providers, but true
                  experts who guide you to the perfect vehicle for your needs.
                </p>
              </div>
            </section>

            {/* Our Mission */}
            <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-semibold mb-6 text-center">Our Mission</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  At CARGURU, we're dedicated to revolutionizing the car rental experience by combining
                  cutting-edge technology with personalized service.
                </p>
                <p>
                  We believe every journey should begin with confidence and comfort. That's why we:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintain the newest, safest fleet in the industry</li>
                  <li>Offer transparent pricing with no hidden fees</li>
                  <li>Provide 24/7 customer support and roadside assistance</li>
                  <li>Continuously innovate to simplify the rental process</li>
                </ul>
              </div>
            </section>

            {/* Values Section */}
            <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-semibold mb-8 text-center">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Value 1 */}
                <div className="bg-gray-700/30 p-6 rounded-xl hover:bg-gray-700/50 transition duration-300">
                  <h3 className="text-xl font-semibold mb-3 text-blue-400">Integrity</h3>
                  <p className="text-gray-300">
                    We operate with honesty and transparency in all our dealings, building trust one rental at a time.
                  </p>
                </div>

                {/* Value 2 */}
                <div className="bg-gray-700/30 p-6 rounded-xl hover:bg-gray-700/50 transition duration-300">
                  <h3 className="text-xl font-semibold mb-3 text-blue-400">Innovation</h3>
                  <p className="text-gray-300">
                    Constantly evolving our services to meet the changing needs of modern travelers.
                  </p>
                </div>

                {/* Value 3 */}
                <div className="bg-gray-700/30 p-6 rounded-xl hover:bg-gray-700/50 transition duration-300">
                  <h3 className="text-xl font-semibold mb-3 text-blue-400">Customer Focus</h3>
                  <p className="text-gray-300">
                    Your satisfaction is our top priority. We listen, adapt, and go the extra mile.
                  </p>
                </div>
              </div>
            </section>

            {/* Team Section */}
            <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-semibold mb-6 text-center">Our Team</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  The CARGURU team consists of over 500 dedicated professionals across the nation,
                  from customer service representatives to automotive experts and technology specialists.
                </p>
                <p>
                  What unites us is a shared passion for mobility solutions and a commitment to
                  making every rental experience exceptional. Many of our team members have been
                  with us since the early days, growing alongside the company.
                </p>
                <p className="font-medium text-white">
                  We're always looking for talented individuals to join our journey. Visit our careers
                  page to explore opportunities.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
