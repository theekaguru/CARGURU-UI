import gwagon from "../assets/gwagon.jpg";
import bmw from "../assets/bmw.jpg";
import mustang from "../assets/mustang.jpg";

export interface Car {
  vehicleId: number;
  carRating?: number;
  carImage: string;
  rentalRate: number | string;
  availability: string; 
  specification: {
    manufacturer: string;
    model: string;
    transmission: string;
    engineCapacity: string;
    seatingCapacity: number;
    fuelType: string;
  };
  location: {
    name: string;
    address?: string;
    contactPhone?: string;
  };
}

export const carData: Car[] = [
  {
    vehicleId: 1,
    carRating: 4.9,
    carImage: gwagon,
    rentalRate: 5500,
    availability: "available", // ✅ ADDED
    specification: {
      manufacturer: "Hyundai",
      model: "Tucson PHEV",
      transmission: "Automatic",
      engineCapacity: "1600cc",
      seatingCapacity: 5,
      fuelType: "Petrol",
    },
    location: {
      name: "Garden City , Thika Road",
    },
  },
  {
    vehicleId: 2,
    carRating: 4.8,
    carImage: bmw,
    rentalRate: 4500,
    availability: "available", 
    specification: {
      manufacturer: "Tesla",
      model: "Model S",
      transmission: "Automatic",
      engineCapacity: "Electric",
      seatingCapacity: 5,
      fuelType: "Electric",
    },
    location: {
      name: "San Francisco, California",
    },
  },
  {
    vehicleId: 3,
    carRating: 4.7,
    carImage: mustang,
    rentalRate: 3300,
    availability: "unavailable", 
    specification: {
      manufacturer: "Ford",
      model: "Mustang",
      transmission: "Manual",
      engineCapacity: "5000cc",
      seatingCapacity: 4,
      fuelType: "Petrol",
    },
    location: {
      name: "New York City",
    },
  },
];
