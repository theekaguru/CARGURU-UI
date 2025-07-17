import { FiEdit, FiTrash2 } from "react-icons/fi";

export const CarSpecifications = () => {
  // Mocked backend response
  const carSpecs = [
    {
      vehicleSpecId: 1,
      manufacturer: "Mazda",
      model: "CX-5",
      year: 2021,
      fuelType: "Petrol",
      engineCapacity: "2000cc",
      transmission: "Automatic",
      seatingCapacity: 5,
      color: "Red",
      features: "Bluetooth, Cruise Control",
      vehicles: [
        {
          carImage: "https://cdn.example.com/images/mazda_cx5.jpg",
        },
        {
          carImage: "https://cdn.example.com/images/nissan_xtrail.jpg",
        },
      ],
    },
    {
      vehicleSpecId: 2,
      manufacturer: "Toyota",
      model: "Corolla",
      year: 2019,
      fuelType: "Diesel",
      engineCapacity: "1800cc",
      transmission: "Manual",
      seatingCapacity: 5,
      color: "White",
      features: "ABS, Rear Camera",
      vehicles: [
        {
          carImage: "https://cdn.example.com/images/toyota_corolla.jpg",
        },
      ],
    },
  ];

  return (
    <>
      <div className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#11120f] via-[#988821] to-[#93141c] animate-pulse">
        All Car Specifications
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Spec ID</th>
              <th>Model</th>
              <th>Manufacturer</th>
              <th>Year</th>
              <th>Fuel</th>
              <th>Engine</th>
              <th>Transmission</th>
              <th>Color</th>
              <th>Seats</th>
              <th>Features</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {carSpecs.map((spec, index) => (
              <tr key={spec.vehicleSpecId}>
                <th>{index + 1}</th>
                <td>
                  {spec.vehicles?.[0]?.carImage ? (
                    <img
                      src={spec.vehicles[0].carImage}
                      alt="Car"
                      className="w-16 h-12 rounded object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No image</span>
                  )}
                </td>
                <td>{spec.vehicleSpecId}</td>
                <td className="font-bold text-[#3d3935]">{spec.model}</td>
                <td>{spec.manufacturer}</td>
                <td>{spec.year}</td>
                <td>{spec.fuelType}</td>
                <td>{spec.engineCapacity}</td>
                <td>{spec.transmission}</td>
                <td>{spec.color}</td>
                <td>{spec.seatingCapacity}</td>
                <td>{spec.features}</td>
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
