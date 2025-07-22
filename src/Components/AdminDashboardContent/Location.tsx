import { FiEdit} from "react-icons/fi";
import { PuffLoader } from "react-spinners";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import Swal from "sweetalert2";
import { AiFillDelete } from "react-icons/ai";
import { locationApi } from "../../../features/api/locationApi";

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
  };
}

// ✅ Utility Functions Below

export const calculateTotalBookings = (location: LocationInterface): number => {
  return Array.isArray(location.bookings) ? location.bookings.length : 0;
};

export const calculateTotalVehicles = (location: LocationInterface): number => {
  if (!Array.isArray(location.bookings)) return 0;
  const uniqueVehicleIds = new Set(location.bookings.map(b => b.vehicleId));
  return uniqueVehicleIds.size;
};

export const calculateTotalAmount = (location: LocationInterface): number => {
  if (!Array.isArray(location.bookings)) return 0;
  return location.bookings.reduce((sum, b) => {
    const amount = parseFloat(b.totalAmount);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);
};

export const Location = () => {
  
    const {user , isAuthenticated} =useSelector((state:RootState)=>state.auth)
    const [updateLocationStatus] = locationApi.useUpdateLocationMutation()
  
    const userId =user?.userId;
  
    const {data:allLocationsData=[] , isLoading , error} = locationApi.useGetAllLocationsQuery(userId,{
    skip:!isAuthenticated
    });
    
    console.log("🚀~Location~locationData:",allLocationsData)
  
    const handleEdit = async (locationId: number) => {
      Swal.fire({
        title: "Are you sure?",
        text: "you want to cancel the Location?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#2563eb",
        cancelButtonColor: "#f44336",
        confirmButtonText: "yes , cancel it!",
      }).then(async (result) => {
        const updatePayload = {
          locationId: locationId,
          status: "Unavailable"
        }
        if (result.isConfirmed) {
          try {
            const res = await updateLocationStatus(updatePayload).unwrap()
            console.log(res)
            Swal.fire("Updated", res.message, "success")
          } catch (error) {
            Swal.fire("Something Went Wrong", "Please Try Again", "error")
          }
        }
      })
    }

    return (
      <>
        <div className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#11120f] via-[#988821] to-[#93141c] animate-pulse">
        ALL Locations
      </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
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
              {
                error ? (
                  <tr>
                    <td colSpan={8}>
                      <div className="text-red-400 text-center">
                        something went Wrong try Again .....
                      </div>
                    </td>
                  </tr>
                ) : isLoading ? (
                  <tr>
                    <td colSpan={8}>
                      <div className="flex justify-center">
                        <PuffLoader color="#0aff13"/>
                      </div>
                    </td>
                  </tr>
                ) : allLocationsData?.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center">
                      No Locations Available
                    </td>
                  </tr>
                ) : (
                  allLocationsData?.map((location: LocationInterface) => (
                    <tr key={location.locationId}>

{/* Location Id */}
                      <td>
                        {location.locationId}
                      </td>
                      
{/* Name */}
                      <td>{location.name}</td>

{/* Address*/}
                      <td>{location.address}</td>

{/* Phone */}
                      <td>{location.contactPhone}</td>

{/* Total bookings */}
                      <td>{calculateTotalBookings(location)}</td>

{/* Total Vehicles*/}
                      <td>{calculateTotalVehicles(location)}</td>                

{/* Total Amount*/}
                      <td>{calculateTotalAmount(location)}</td>  

{/* update and delete Location */}
                      <td>
                        <button className="text-blue-500 hover:text-blue-400 btn btn-sm btn-outline"
                          onClick={() => handleEdit(location.locationId)}>
                          <FiEdit/>
                        </button>
                        <button className="btn btn-sm btn-outline text-red-500 ml-1 hover:bg-red-700">
                          <AiFillDelete />
                        </button>
                      </td>
                    </tr>
                  ))
                )
              }
            </tbody>
          </table>
        </div>
      </>
    )
}
