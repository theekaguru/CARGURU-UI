import gwagon from "../assets/gwagon.jpg"
import bmw from"../assets/bmw.jpg"
import mustang from"../assets/mustang.jpg"
import porche from "../assets/porche.jpg"

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
    image: porche ,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Adventure SUV",
    description: "Tackle any terrain with confidence and space.",
    image: gwagon,
    rating: 4.6,
  },
  {
    id: 3,
    name: "Fuel Consumpution free",
    description: "Enjoy the freedom of the open road.",
    image: bmw ,
    rating: 4.9,
  },
    {
    id: 4,
    name: "Feel the thrill in tires ",
    description: "Beat The Roads Like There's No Tomorrow.",
    image: mustang ,
    rating: 4.9,
  },
];
