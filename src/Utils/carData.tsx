// data/carData.tsx

export interface Car {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
}

export const carData: Car[] = [
  {
    id: 1,
    name: "Luxury Sedan",
    description: "Experience the ultimate in comfort and style.",
    image: "https://images.unsplash.com/photo-1616789849643-0e42a6c82d63?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Adventure SUV",
    description: "Tackle any terrain with confidence and space.",
    image: "https://images.unsplash.com/photo-1589396575555-e7be6a9f3795?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Coastal Convertible",
    description: "Enjoy the freedom of the open road.",
    image: "https://images.unsplash.com/photo-1613323593608-abc5fc8be4d2?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
  },
];
