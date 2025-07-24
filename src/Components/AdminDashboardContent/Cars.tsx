import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { vehicleApi } from "../../../features/api/vehicleApi";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import { PuffLoader } from "react-spinners";
import { AiFillDelete } from "react-icons/ai";
import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { SaveIcon } from "lucide-react";
import { FaAddressBook, FaTimes } from "react-icons/fa";

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

type AddFormValues = {
  manufacturer: string;
  model: string;
  fuelType: string;
  rentalRate: number;
  vehicleImage: string;
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "available": return "badge-success"
    case "unavailable": return "badge-error"
    default: return "badge-primary"
  }
};

export const Cars = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [createVehicle] = vehicleApi.useCreateVehicleMutation();
  const [updateVehicleStatus] = vehicleApi.useUpdateVehicleMutation();
  const [deleteVehicle] = vehicleApi.useDeleteVehicleMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddFormValues>();

  const [carImage, setCarImage] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const cloud_name = "yourcloud_name";
  const preset_key = "yourpreset_key";

  const userId = user?.userId;

  const { data: allVehicleData = [], isLoading: isVehicleLoading, error } = vehicleApi.useGetAllVehiclesQuery(userId, {
    skip: !isAuthenticated
  });

  const handleModalToggle = () => setIsAddModalOpen(!isAddModalOpen);

  const handleEdit = async (vehicleId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "you want to cancel the Car?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#f44336",
      confirmButtonText: "yes , cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await updateVehicleStatus({ vehicleId, availability: "unavailable" }).unwrap();
          Swal.fire("Updated", res.message, "success");
        } catch (error) {
          Swal.fire("Something Went Wrong", "Please Try Again", "error");
        }
      }
    });
  };

  const handleDelete = async (vehicleId: number) => {
    const confirm = window.confirm("Are you sure you want to delete this vehicle?");
    if (confirm) {
      try {
        await deleteVehicle(vehicleId).unwrap();
        toast.success("Vehicle deleted successfully");
      } catch (error) {
        toast.error("Failed to delete vehicle. Please try again.");
      }
    }
  };

  const handleFileChange = async (e: any) => {
    setIsLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    try {
      const res = await axios(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: "POST",
        data: formData
      });
      setCarImage(res.data.secure_url);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit: SubmitHandler<AddFormValues> = async (data) => {
    const loadingToastId = toast.loading("Adding the car...");
    try {
      await createVehicle({
        rentalRate: data.rentalRate,
        availability: "available",
        specification: {
          manufacturer: data.manufacturer,
          model: data.model,
          fuelType: data.fuelType,
          vehicleImage: carImage,
          engineCapacity: "",
          seatingCapacity: 0,
          transmission: "",
          year: new Date().getFullYear(),
          color: "",
          features: ""
        },
        location: {
          name: ""
        }
      }).unwrap();
      toast.success("Vehicle added successfully", { id: loadingToastId });
      reset();
      setCarImage("");
      setIsAddModalOpen(false);
    } catch (error: any) {
      toast.error("Failed to add vehicle. Please try again.", error);
      toast.dismiss(loadingToastId);
    }
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#11120f] via-[#988821] to-[#93141c] animate-pulse">
        All Vehicles
        <button className="btn btn-warning ml-4" onClick={handleModalToggle}><FaAddressBook /> Add Car</button>
      </div>
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
              <th>Location ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              error ? (
                <tr><td colSpan={9}><div className="text-red-400">Something went wrong. Try again.</div></td></tr>
              ) : isVehicleLoading ? (
                <tr><td colSpan={9}><PuffLoader color="#0aff13" /></td></tr>
              ) : allVehicleData.length === 0 ? (
                <tr><td colSpan={9}><div>No vehicles available</div></td></tr>
              ) : (
                allVehicleData.map((vehicle: vehicleInterface) => (
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
                    <td><div className={`badge badge-outline ${getStatusBadge(vehicle.availability)}`}>{vehicle.availability}</div></td>
                    <td>{vehicle.location?.name || "N/A"}</td>
                    <td>
                      <button className="text-blue-500 hover:text-blue-400 btn btn-sm btn-outline" onClick={() => handleEdit(vehicle.vehicleId)}><FiEdit /></button>
                      <button className="btn btn-sm btn-outline text-red-500 ml-1 hover:bg-red-700" onClick={() => handleDelete(vehicle.vehicleId)}><AiFillDelete /></button>
                    </td>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
      </div>
      {isAddModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex justify-center items-center mb-4">
              <h2 className="text-2xl font-bold text-orange-500">Add A Car</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-orange-500">Manufacturer</label>
                <input type="text" className="input w-full text-blue-500 text-sm" {...register('manufacturer', { required: 'Manufacturer is required' })} />
                {errors.manufacturer && <p className="text-red-500 text-sm">{errors.manufacturer.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-orange-500">Model</label>
                <input type="text" className="input w-full text-blue-500 text-sm" {...register('model', { required: 'Model is required' })} />
                {errors.model && <p className="text-red-500 text-sm">{errors.model.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-orange-500">Fuel Type</label>
                <input type="text" className="input w-full text-blue-500 text-sm" {...register('fuelType', { required: 'Fuel type is required' })} />
                {errors.fuelType && <p className="text-red-500 text-sm">{errors.fuelType.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-orange-500">Rental Rate</label>
                <input type="number" className="input w-full text-blue-500 text-sm" {...register('rentalRate', { required: 'Rental rate is required' })} />
                {errors.rentalRate && <p className="text-red-500 text-sm">{errors.rentalRate.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-orange-500">Vehicle Image</label>
                <input type="file" onChange={handleFileChange} className="input input-bordered w-full text-blue-500 text-sm" />
              </div>
              <img src={carImage} alt="car" width="75" height="75" />
              <div className="flex justify-end">
                <button onClick={handleModalToggle} className="btn mr-2 btn-error"><FaTimes /> Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={isLoading}><SaveIcon /> Add Car</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
