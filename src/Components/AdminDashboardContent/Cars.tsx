import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { vehicleApi } from "../../../features/api/vehicleApi";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { SaveIcon } from "lucide-react";
import { PuffLoader } from "react-spinners";
import { FaAddressBook, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { useState } from "react";

interface vehicleInterface {
  vehicleId: number;
  carRating?: number;
  rentalRate: number;
  availability: string;
  specification: {
    manufacturer: string;
    model: string;
    transmission: string;
    engineCapacity: string;
    seatingCapacity: number;
    fuelType: string;
    year: number;
    color: string;
    features: string;
    vehicleImage: string;
  };
  location: {
    name: string;
    address?: string;
    contactPhone?: string;
  };
}

type AddVehicleForm = {
  vehicleSpecId: number
  rentalRate: number;
  availability: string;
  vehicleImage: string;
  manufacturer: string;
  model: string;
  transmission: string;
  engineCapacity: string;
  seatingCapacity: number;
  fuelType: string;
  year: number;
  color: string;
  features: string;
  location: string;
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "available": return "badge-success";
    case "unavailable": return "badge-error";
    default: return "badge-primary";
  }
};

export const Cars = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const userId = user?.userId;

  const { data: allVehicleData = [], isLoading, error } = vehicleApi.useGetAllVehiclesQuery(userId, {
  skip: !isAuthenticated
  });

  const [createVehicle] = vehicleApi.useCreateVehicleMutation();
  const [updateVehicleStatus] = vehicleApi.useUpdateVehicleMutation();
  const [deleteVehicle] = vehicleApi.useDeleteVehicleMutation();


  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddVehicleForm>();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddModalToggle = () => {setIsAddModalOpen(!isAddModalOpen);};
  
const onSubmit: SubmitHandler<AddVehicleForm> = async (data) => {
  const toastId = toast.loading("Adding vehicle...");
  try {
    const payload = {
      vehicleSpecId: data.vehicleSpecId,
      rentalRate: data.rentalRate,
      availability: data.availability,
    };
    const res = await createVehicle(payload).unwrap();

    toast.success(res.message, { id: toastId });

    // ✅ Safely reset and close modal after successful mutation
    reset();
    setTimeout(() => {
      setIsAddModalOpen(false);
    }, 100); // Small delay ensures form remains mounted during completion
  } catch (err: any) {
    toast.error("Error adding vehicle 🚫", { id: toastId });
  }
};




  const handleEdit = async (vehicleId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "you want to mark this vehicle unavailable?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#f44336",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await updateVehicleStatus({ vehicleId, availability: "unavailable" }).unwrap();
          Swal.fire("Updated", res.message, "success");
        } catch (err) {
          Swal.fire("Error", "Failed to update.", "error");
        }
      }
    });
  };

  const handleDelete = async (vehicleId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this vehicle?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteVehicle(vehicleId).unwrap();
          toast.success(res.message);
        } catch (err) {
          toast.error("Failed to delete vehicle.");
        }
      }
    });
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#11120f] via-[#988821] to-[#93141c] animate-pulse">
        Vehicle Management Page
        <button className="btn btn-warning ml-3 flex items-center gap-2" onClick={handleAddModalToggle}>
          <FaAddressBook /> Add Vehicle
        </button>
      </div>
        {
          error ? (
            <div className="text-red-500">
                  something went wrong try again
            </div>
          ):isLoading ? (
            <div className="loading">
              <PuffLoader/>
              loading....
            </div>
          ): allVehicleData?.length === 0 ? (
            <div>No vehicles Available</div>
          ):(
            <div className="overflow-x-auto">
             <table className="table">
          <thead>
            <tr>
              <th>Car Id</th>
              <th>Vehicle</th>
              <th>Color</th>
              <th>Fuel</th>
              <th>Transmission</th>
              <th>Rate</th>
              <th>Available</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { allVehicleData.map((vehicle: vehicleInterface) => (
                <tr key={vehicle.vehicleId}>
                  <td>{vehicle.vehicleId}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={vehicle.specification.vehicleImage} alt="car" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{vehicle.specification.manufacturer}</div>
                        <div className="text-sm opacity-50">{vehicle.specification.model}</div>
                      </div>
                    </div>
                  </td>
                  <td>{vehicle.specification.color}</td>
                  <td>{vehicle.specification.fuelType}</td>
                  <td>{vehicle.specification.transmission}</td>
                  <td>KSH: {vehicle.rentalRate}</td>
                  <td>
                    <div className={`badge badge-outline ${getStatusBadge(vehicle.availability)}`}>{vehicle.availability}</div>
                  </td>
                  <td>{vehicle.location?.name || "N/A"}</td>
                  <td>
                    <button onClick={() => handleEdit(vehicle.vehicleId)} className="btn btn-sm btn-outline text-blue-500 mr-2">
                      <FiEdit />
                    </button>
                    <button onClick={() => handleDelete(vehicle.vehicleId)} className="btn btn-sm btn-outline text-red-500">
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        </div>
          )
        }
          {isAddModalOpen && (
      <div className="modal modal-open">
        <div className="modal-box max-w-4xl">
          <div className="flex justify-center items-center mb-4">
            <h2 className="text-2xl font-bold text-orange-500">Add Vehicle Spec</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["manufacturer", "Manufacturer"],
                ["model", "Model"],
                ["year", "Year"],
                ["fuelType", "Fuel Type"],
                ["engineCapacity", "Engine Capacity"],
                ["transmission", "Transmission"],
                ["seatingCapacity", "Seats"],
                ["color", "Color"],
                ["features", "Features"],
                ["vehicleImage", "Vehicle Image URL"],
                ["location", "Location"],
              ].map(([key, label]) => (
                <div key={key}>
                  <label htmlFor={key} className="block text-sm font-medium text-orange-500">{label}</label>
                  <input
                    id={key}
                    type={key === "year" || key === "seatingCapacity" ? "number" : "text"}
                    className="input w-full text-blue-500 text-sm"
                    {...register(key as keyof AddVehicleForm, {
                      required: `${label} is required`,
                      ...(key === "year" || key === "seatingCapacity" ? { valueAsNumber: true } : {})
                    })}
                  />
                  {errors[key as keyof AddVehicleForm] && (
                    <p className="text-red-500 text-sm">
                      {errors[key as keyof AddVehicleForm]?.message}
                    </p>
                  )}
                </div>
              ))}

              <div>
                <label htmlFor="rentalRate" className="block text-sm font-medium text-orange-500">Rental Rate (Ksh)</label>
                <input
                  type="number"
                  id="rentalRate"
                  className="input w-full text-blue-500 text-sm"
                  {...register("rentalRate", { required: "Rental Rate is required", valueAsNumber: true })}
                />
                {errors.rentalRate && (
                  <p className="text-red-500 text-sm">{errors.rentalRate.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-orange-500">Availability</label>
                <select
                  id="availability"
                  className="select w-full text-blue-500 text-sm"
                  {...register("availability", { required: "Availability is required" })}
                >
                  <option value="">Select</option>
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </select>
                {errors.availability && (
                  <p className="text-red-500 text-sm">{errors.availability.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button onClick={handleAddModalToggle} type="button" className="btn btn-error mr-2">
                <FaTimes /> Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <SaveIcon /> Add Vehicle
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    </>
  );
};
