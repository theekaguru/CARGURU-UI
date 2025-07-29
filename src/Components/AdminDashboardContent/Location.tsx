import { FiEdit } from "react-icons/fi";
import { PuffLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { FaAddressBook, FaTimes } from "react-icons/fa";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import { SaveIcon } from "lucide-react";
import { locationApi } from "../../../features/api/locationApi";
import type { RootState } from "../../app/store";

// 🧮 Interfaces
interface LocationInterface {
  locationId: number;
  name: string;
  address: string;
  contactPhone: string;
  bookings: {
    bookingId: number;
    vehicleId: number;
    locationId: number;
    bookingDate: string;
    returnDate: string;
    totalAmount: string;
    bookingStatus: string;
  }[];
}

type AddLocationFormValues = {
  name: string;
  address: string;
  contactPhone: string;
};

// 🔢 Utility Functions
export const calculateTotalBookings = (location: LocationInterface): number =>
  Array.isArray(location.bookings) ? location.bookings.length : 0;

export const calculateTotalVehicles = (location: LocationInterface): number => {
  if (!Array.isArray(location.bookings)) return 0;
  const uniqueVehicleIds = new Set(location.bookings.map((b) => b.vehicleId));
  return uniqueVehicleIds.size;
};

export const calculateTotalAmount = (location: LocationInterface): number => {
  if (!Array.isArray(location.bookings)) return 0;
  return location.bookings.reduce((sum, b) => {
    const amount = parseFloat(b.totalAmount);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);
};

// 📍 Component
export const Location = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const userId = user?.userId;

  const { data: allLocationsData = [], isLoading, error } = locationApi.useGetAllLocationsQuery(userId, {
    skip: !isAuthenticated,
  });

  const [createLocation] = locationApi.useCreateLocationMutation();
  const [deleteLocation] = locationApi.useDeleteLocationMutation();
  const [updateLocation] = locationApi.useUpdateLocationMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<AddLocationFormValues>();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationInterface | null>(null);
  const [isLoadingUpload] = useState(false);

  const handleModalToggle = () => {
    reset();
    setSelectedLocation(null);
    setIsAddModalOpen(!isAddModalOpen);
  };

  const handleDelete = async (locationId: number) => {
    const confirm = window.confirm("Are you sure you want to delete this location?");
    if (!confirm) return;

    try {
      const res = await deleteLocation(locationId).unwrap();
      toast.success(res.message || "Location deleted successfully");
    } catch (err) {
      toast.error("Something went wrong while deleting location.");
    }
  };

  const handleUpdate = (locationId: number) => {
    const location = allLocationsData.find((l: LocationInterface) => l.locationId === locationId);
    if (location) {
      setSelectedLocation(location);
      setValue("name", location.name);
      setValue("address", location.address);
      setValue("contactPhone", location.contactPhone);
      setIsEditModalOpen(true);
    }
  };

  const onSubmit: SubmitHandler<AddLocationFormValues> = async (data) => {
    const loadingToastId = toast.loading(selectedLocation ? "Updating location..." : "Adding location...");

    try {
      if (selectedLocation) {
        // Update mode
        const res = await updateLocation({ id: selectedLocation.locationId, ...data }).unwrap();
        toast.success(res.message, { id: loadingToastId });
        setIsEditModalOpen(false);
        setSelectedLocation(null);
      } else {
        // Add mode
        const res = await createLocation(data).unwrap();
        toast.success(res.message, { id: loadingToastId });
        setIsAddModalOpen(false);
      }
      reset();
    } catch (err) {
      toast.error("Failed to submit location", { id: loadingToastId });
    }
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="text-2xl font-bold text-center mb-4 text-orange-400">
        <h1>Location Management Page</h1>
        <button className="btn btn-warning flex items-center gap-2" onClick={handleModalToggle}>
          <FaAddressBook /> Add Location
        </button>
      </div>

      {error ? (
        <div className="text-red-500">something went wrong try again</div>
      ) : isLoading ? (
        <div className="loading">
          <PuffLoader />
          loading....
        </div>
      ) : allLocationsData.length === 0 ? (
        <div>No vehicles Available</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Total Bookings</th>
                <th>Total Vehicles</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allLocationsData.map((location: LocationInterface) => (
                <tr key={location.locationId}>
                  <td>{location.locationId}</td>
                  <td>{location.name}</td>
                  <td>{location.address}</td>
                  <td>{location.contactPhone}</td>
                  <td>{calculateTotalBookings(location)}</td>
                  <td>{calculateTotalVehicles(location)}</td>
                  <td>KSH: {calculateTotalAmount(location).toFixed(2)}</td>
                  <td>
                    <button
                      className="text-blue-700 hover:text-blue-500 btn btn-sm btn-outline"
                      onClick={() => handleUpdate(location.locationId)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600 btn btn-sm ml-2 btn-outline"
                      onClick={() => handleDelete(location.locationId)}
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(isAddModalOpen || isEditModalOpen) && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex justify-center items-center mb-4">
              <h2 className="text-2xl font-bold text-orange-500">
                {selectedLocation ? "Edit Location" : "Add A Location"}
              </h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-orange-500">
                  Location Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="input w-full text-blue-500 text-sm"
                  {...register("name", { required: "Location name is required" })}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-orange-500">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="input w-full text-blue-500 text-sm"
                  {...register("address", { required: "Address is required" })}
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="contactPhone" className="block text-sm font-medium text-orange-500">
                  Contact Phone
                </label>
                <input
                  type="text"
                  id="contactPhone"
                  className="input w-full text-blue-500 text-sm"
                  {...register("contactPhone", { required: "Phone number is required" })}
                />
                {errors.contactPhone && <p className="text-red-500 text-sm">{errors.contactPhone.message}</p>}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                    setSelectedLocation(null);
                    reset();
                  }}
                  className="btn mr-2 btn-error"
                >
                  <FaTimes /> Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={isLoadingUpload}>
                  <SaveIcon /> {selectedLocation ? "Update Location" : "Add Location"}{" "}
                  {isLoadingUpload && "Uploading..."}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
