import { Star } from "lucide-react";
import { testimonialData } from "../../Utils/data";
import { Container } from "../Container";

interface Testimonial {
  name: string;
  avatar: string;
  rating: number;
  comment: string;
}

export default function Testimonials() {

  return (
    <div className="bg-gradient-to-br from-[#888372] via-[#a3a4a1] to-[#160d0b] py-12 px-4">
      <Container className="">
        <h2 className="text-4xl font-bold text-center text-white mb-10">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonialData.map((item, index) => (
            <TestimonialCard key={index} {...item} />
          ))}
        </div>
      </Container>
    </div>
  );
}

function TestimonialCard({ name, avatar, rating, comment }: Testimonial) {
  return (
    <div className="card bg-gradient-to-br from-[#888372] via-[#a3a4a1] to-[#c5981e]  shadow-xl p-6 hover:scale-105 transition-transform duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="avatar">
          <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={avatar} alt={`${name} Avatar`} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < rating ? "currentColor" : "none"}
                className={i < rating ? "" : "text-gray-300"}
                stroke="none"
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-700">{comment}</p>
    </div>
  );
}
