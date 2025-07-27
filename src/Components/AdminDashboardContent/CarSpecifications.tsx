// ... imports remain unchanged
import { FiEdit } from "react-icons/fi";
import { PuffLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { useForm, type SubmitHandler } from "react-hook-form";
import { vehicleSpecApi } from "../../../features/api/vehicleSpecApi";
import type { RootState } from "../../../app/store";
import { AiFillDelete } from "react-icons/ai";
import { FaAddressBook, FaTimes } from "react-icons/fa";
import { SaveIcon } from "lucide-react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useState } from "react";

interface CarSpecificationInterface {
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
  createdAt?: string;
}

type AddFormValues = CarSpecificationInterface;

export const CarSpecifications = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const userId = user?.userId;

  const {
    data: allVehicleSpecificationData = [], isLoading, error,
  } = vehicleSpecApi.useGetAllVehicleSpecificationsQuery(userId, {
    skip: !isAuthenticated
  });

  const [createVehicleSpec] = vehicleSpecApi.useCreateVehicleSpecificationMutation();
  const [updateVehicleSpecStatus] = vehicleSpecApi.useUpdateVehicleSpecificationMutation();
  const [deleteVehicleSpec] = vehicleSpecApi.useDeleteVehicleSpecificationMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddFormValues>();

  const [vehicleImage, setVehicleImage] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editSpec, setEditSpec] = useState<CarSpecificationInterface | null>(null);
  const [isImgUploading, setIsImgUploading] = useState(false);

  const cloud_name = 'dfty9bjsf';
  const preset_key = 'CARGURU-RIDES';

  const handleModalToggle = () => {
    setIsAddModalOpen(!isAddModalOpen);
    setIsEditMode(false);
    setEditSpec(null);
    setVehicleImage("");
    reset();
  };

  const handleDelete = async (vehicleSpecId: number) => {
    try {
      await deleteVehicleSpec(vehicleSpecId).unwrap();
      toast.success("Vehicle deleted successfully");
    } catch (err) {
      toast.error("Failed to delete vehicle");
    }
  };

  const handleEdit = (vehicleSpecId: number) => {
    const spec = allVehicleSpecificationData.find((v: CarSpecificationInterface) => v.vehicleSpecId === vehicleSpecId);
    if (spec) {
      setEditSpec(spec);
      setIsEditMode(true);
      setIsAddModalOpen(true);
      setVehicleImage(spec.vehicleImage);
      reset({ ...spec }); // 🛠️ safe assignment
    }
  };


  const onSubmit: SubmitHandler<AddFormValues> = async (data) => {
    const LoadingtoastId = toast.loading(isEditMode ? "Updating vehicle spec..." : "Adding vehicle spec...");
    data.vehicleImage = vehicleImage;
    try {
      const payload = {
        ...data,
        userId, // ✅ Ensure userId is sent
      };
      if (isEditMode && editSpec) {
        const res = await updateVehicleSpecStatus(payload).unwrap();
        toast.success(res.message, { id: LoadingtoastId });
      } else {
        const res = await createVehicleSpec(payload).unwrap();
        toast.success(res.message, { id: LoadingtoastId });
      }
      reset();
      setVehicleImage("");
      setIsAddModalOpen(false);
      setIsEditMode(false);
      setEditSpec(null);
    } catch (err) {
      toast.error(isEditMode ? "Failed to update vehicle spec" : "Failed to add vehicle spec", { id: LoadingtoastId });
    }
  };

  const handleFileChange = async (e: any) => {
    setIsImgUploading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);

    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);
      setVehicleImage(res.data.secure_url);
    } catch (err) {
      console.log(err);
    } finally {
      setIsImgUploading(false);
    }
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#11120f] via-[#988821] to-[#93141c] animate-pulse">
        Car Specs
        <button
          className="btn btn-warning ml-4 flex items-center gap-2"
          onClick={handleModalToggle}
        >
          <FaAddressBook /> Add VehicleSpec
        </button>
      </div>
      {
        error ? (
          <div className="text-red-500">
            something went wrong try again
          </div>
        ) : isLoading ? (
          <div className="loading">
            <PuffLoader />
            loading....
          </div>
        ) : allVehicleSpecificationData.length === 0 ? (
          <div>No vehicleSpecs Available</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Spec Id</th>
                  <th>vehicle</th>
                  <th>Year</th>
                  <th>fuelType</th>
                  <th>EngineCapacity</th>
                  <th>Transmission</th>
                  <th>Seats</th>
                  <th>Color</th>
                  <th>Features</th>
                  <th>Number Plate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  allVehicleSpecificationData.map((vehicleSpec: CarSpecificationInterface) => (
                    <tr key={vehicleSpec.vehicleSpecId}>
                      <td>{vehicleSpec.vehicleSpecId}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img src={vehicleSpec.vehicleImage} alt="vehicle" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{vehicleSpec.manufacturer}</div>
                            <div className="text-sm opacity-50">{vehicleSpec.model}</div>
                          </div>
                        </div>
                      </td>
                      <td>{vehicleSpec.year}</td>
                      <td>{vehicleSpec.fuelType}</td>
                      <td>{vehicleSpec.engineCapacity}</td>
                      <td>{vehicleSpec.transmission}</td>
                      <td>{vehicleSpec.seatingCapacity}</td>
                      <td>{vehicleSpec.color}</td>
                      <td>{vehicleSpec.features}</td>
                      <td>{vehicleSpec.numberPlate}</td>
                      <td>
                        <button className="text-blue-500 hover:text-blue-400 btn btn-sm btn-outline" onClick={() => handleEdit(vehicleSpec.vehicleSpecId)}>
                          <FiEdit />
                        </button>
                        <button className="btn btn-sm btn-outline text-red-500 ml-1 hover:bg-red-700" onClick={() => handleDelete(vehicleSpec.vehicleSpecId)}>
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
          <div className="modal-box">
            <div className="flex justify-center items-center mb-4">
              <h2 className="text-2xl font-bold text-orange-500">{isEditMode ? 'Edit Vehicle Spec' : 'Add Vehicle Spec'}</h2>
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
                  ["numberPlate", "Number Plate"],
                ].map(([key, label]) => (
                  <div key={key}>
                    <label htmlFor={key} className="block text-sm font-medium text-orange-500">{label}</label>
                    <input
                      id={key}
                      type={key === "year" || key === "seatingCapacity" ? "number" : "text"}
                      className="input w-full text-blue-500 text-sm"
                      {...register(key as keyof AddFormValues, {
                        required: `${label} is required`,
                        ...(key === "year" || key === "seatingCapacity" ? { valueAsNumber: true } : {})
                      })}
                    />
                    {errors[key as keyof AddFormValues] && (
                      <p className="text-red-500 text-sm">
                        {errors[key as keyof AddFormValues]?.message}
                      </p>
                    )}
                  </div>
                ))}
                <div className="col-span-2">
                  <label htmlFor="vehicleImage" className="block text-sm font-medium text-orange-500">Upload Image</label>
                  <input type="file" onChange={handleFileChange} className="input w-full" />
                  {vehicleImage && <img src={vehicleImage} alt="Uploaded" className="w-20 h-20 mt-2" />}
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button onClick={handleModalToggle} type="button" className="btn btn-error mr-2">
                  <FaTimes /> Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={isImgUploading}>
                  <SaveIcon /> {isImgUploading ? 'Uploading...' : isEditMode ? 'Update Vehicle Spec' : 'Add Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
