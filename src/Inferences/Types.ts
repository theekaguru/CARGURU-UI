


export interface User {
  userId: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  contactPhone: string;
  address: string;
  userType: string;
  confirmationCode:string;
  emailVerified: boolean;
  profileImage: string;
  createdAt: string;
  updatedAt: string;
}


export interface VehicleSpecification {
  vehicleSpecId: number;
  manufacturer: string;
  model: string;
  year: number;
  fuelType: string;
  engineCapacity: string;
  transmission: string;
  seatingCapacity: number;
  color: string;
  features: string;
  vehicleImage:string;
  numberPlate:string;
}

 export interface Vehicle{
  vehicleId: number;
  carRating?: number;
  rentalRate: number;
  availability: string; 
}

export interface Location{
  locationId: number;
  name:string;
  address:string; 
  contactPhone:string; 
}

export interface Bookings{
  bookingId: number;
  bookingDate: string;
  returnDate: string;
  totalAmount: string;
  bookingStatus: string;   
}

export interface Payments{
  paymentId:number;
  amount:number;
  paymentStatus:string;
  paymentDate:string;
  paymentMethod:string;
  transactionId:string;

}

    export interface SupportTickets{
    ticketId:number;
    subject:string;
    description:string;
    status:string;
    createdAt:string
    }

    // Not nested — each type is flat and referenced individually
export interface InferTypes extends Vehicle, VehicleSpecification, Location {}
