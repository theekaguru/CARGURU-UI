import { Star } from "lucide-react";
import { testimonialData } from "../../Utils/data";

interface Testimonial {
  name: string;
  avatar: string;
  rating: number;
  comment: string;
}

export default function Testimonials() {
  return (
    <div className="w-full py-16 px-4 md:px-10 bg-[#0C1729] text-white">
      <h2 className="text-4xl font-bold text-center mb-12 text-[#E2ECFD]">
        What Our Users Say
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonialData.map((item, index) => (
          <TestimonialCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({ name, avatar, rating, comment }: Testimonial) {
  return (
    <div className="bg-gradient-to-br from-[#1D3C6E] to-[#2D4974] rounded-xl shadow-xl p-6 hover:scale-105 transition-transform duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#6896C0]">
          <img
            src={avatar}
            alt={`${name} Avatar`}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < rating ? "currentColor" : "none"}
                className={i < rating ? "" : "text-[#6896C0]" }
                stroke="none"
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-[#DCE3F0]">{comment}</p>
    </div>
  );
}
