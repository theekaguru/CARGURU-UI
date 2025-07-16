import gwagon from "../assets/gwagon.jpg";
import bmw from "../assets/bmw.jpg";
import mustang from "../assets/mustang.jpg";

export interface Car {
  vehicleId: number;
  manufacturer: string;
  model: string;
  carRating: number;
  carImage: string;
  location: string;
  rentalRate: number;
  transmission: string;
  engineCapacity: string;
  seatingCapacity: number;
  fuelType: string;
}


export const carData: Car[] = [
  {
    vehicleId: 1,
    manufacturer: "Hyundai",
    model: "Tucson PHEV",
    carRating: 4.9,
    carImage: gwagon,
    location: "Ji Kendalsari V, Malang, East Java",
    rentalRate: 56.88,
    transmission: "Automatic",
    engineCapacity: "1600cc",
    seatingCapacity: 5,
    fuelType: "Petrol",
  },
  {
    vehicleId: 2,
    manufacturer: "Tesla",
    model: "Model S",
    carRating: 4.8,
    carImage: bmw,
    location: "San Francisco, California",
    rentalRate: 75.5,
    transmission: "Automatic",
    engineCapacity: "Electric",
    seatingCapacity: 5,
    fuelType: "Electric",
  },
  {
    vehicleId: 3,
    manufacturer: "Ford",
    model: "Mustang",
    carRating: 4.7,
    carImage: mustang,
    location: "New York City",
    rentalRate: 65.0,
    transmission: "Manual",
    engineCapacity: "5000cc",
    seatingCapacity: 4,
    fuelType: "Petrol",
  }
];
