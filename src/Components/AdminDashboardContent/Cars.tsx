import { FiEdit, FiTrash2 } from "react-icons/fi";

export const Cars = () => {
  // Static mock data simulating backend response
  const cars = [
    {
      vehicleId: 1,
      carImage: "https://cdn.example.com/images/mazda_cx5.jpg",
      rentalRate: "5000.00",
      availability: "available",
      location: { name: "Nairobi HQ" },
      specification: {
        manufacturer: "Mazda",
        model: "CX-5",
        year: 2021,
        fuelType: "Petrol",
        engineCapacity: "2000cc",
        transmission: "Automatic",
        seatingCapacity: 5,
        color: "Red",
      },
    },
    {
      vehicleId: 2,
      carImage: "https://cdn.example.com/images/toyota_hilux.jpg",
      rentalRate: "4500.00",
      availability: "unavailable",
      location: { name: "Thika Branch" },
      specification: {
        manufacturer: "Toyota",
        model: "Hilux",
        year: 2020,
        fuelType: "Diesel",
        engineCapacity: "2400cc",
        transmission: "Manual",
        seatingCapacity: 5,
        color: "White",
      },
    },
  ];

  return (
    <>
      <div className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#11120f] via-[#988821] to-[#93141c] animate-pulse">
        All Cars
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Manufacturer</th>
              <th>Model</th>
              <th>Location</th>
              <th>Year</th>
              <th>Fuel</th>
              <th>Engine</th>
              <th>Transmission</th>
              <th>Seats</th>
              <th>Color</th>
              <th>Rate (Ksh)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, idx) => (
              <tr key={car.vehicleId}>
                <th>{car.vehicleId}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={car.carImage} alt={car.specification.model} />
                    </div>
                  </div>
                </td>
                <td>{car.specification.manufacturer}</td>
                <td className="font-bold text-[#3d3935]">{car.specification.model}</td>
                <td>{car.location.name}</td>
                <td>{car.specification.year}</td>
                <td>{car.specification.fuelType}</td>
                <td>{car.specification.engineCapacity}</td>
                <td>{car.specification.transmission}</td>
                <td>{car.specification.seatingCapacity}</td>
                <td>{car.specification.color}</td>
                <td>{car.rentalRate}</td>
                <td>
                  <div
                    className={`badge badge-outline ${
                      car.availability === "available"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {car.availability}
                  </div>
                </td>
                <td className="flex gap-1">
                  <button className="btn btn-sm btn-outline text-green-700 hover:text-green-500">
                    <FiEdit />
                  </button>
                  <button className="btn btn-sm btn-outline text-red-700 hover:text-red-500">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
