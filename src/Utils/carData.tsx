// src/Utils/carData.ts

export interface Car {
  vehicleId: number;
  carRating?: number;
  rentalRate: number;
  availability: string;

  specification: {
    vehicleSpecId: number;
    vehicleImage: string;
    manufacturer: string;
    model: string;
    year: number;
    fuelType: string;
    engineCapacity: string;
    transmission: string;
    seatingCapacity: number;
    color: string;
    features: string;
    numberPlate: string;
  };

  location: {
    name: string;
    address?: string;
    contactPhone?: string;
    locationId?: string;
  };

  description?: string;
}

export const carData: Car[] = [];
