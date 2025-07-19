import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { vehicleApi } from "../../../features/api/vehicleApi";
import { FiEdit } from "react-icons/fi"
import Swal from "sweetalert2"
import { PuffLoader } from "react-spinners";
import { AiFillDelete } from "react-icons/ai";


interface vehicledata {
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
    year:number;
    color:string;
    features:string;
    vehicleImage:string;
  };
  location: {
    name: string;
    address?: string;
    contactPhone?: string;
  };
}

const getStatusBadge =(status:string)=>{
  switch(status){
    case "Avaialble":return "badge-success"
    case "Unavailable":return "badge-error"
    default: return "badge-primary"

  }
}

export const Cars = () => {

  const {user , isAuthenticated} =useSelector((state:RootState)=>state.auth)
  const [updateVehicleStatus] = vehicleApi.useUpdateVehicleMutation()

  const userId =user?.userId;

  const {data:allVehicleData=[] , isLoading , error} = vehicleApi.useGetAllVehiclesQuery(userId,{
  skip:!isAuthenticated
  });
  
  console.log("🚀~Vehicle~VehicleData:",allVehicleData)

  const handleEdit = async (VehicleId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "you want to cancel the Car?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#f44336",
      confirmButtonText: "yes , cancel it!",
    }).then(async (result) => {
      const updatePayload = {
        VehicleId: VehicleId,
        status: "Unavailable"
      }
      if (result.isConfirmed) {
        try {
          const res = await updateVehicleStatus(updatePayload).unwrap()
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
        All Vehicles
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
                <th>Car Id </th>
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
                <div className="text-red-400">
                  something went Wrong try Again .....
                </div>
              ): isLoading ? (
                <div>
                 <PuffLoader color="#0aff13"/>
                </div>
              ) : allVehicleData?.length === 0 ? (
                <tr>
                  <div>No Orders Available</div>
                </tr>
              ):(
                allVehicleData?.map((vehicle:vehicledata)=>(
                  <tr key={vehicle.vehicleId}>

 {/* Car id */}
                    <td>
                      <th>{vehicle.vehicleId}</th>
                    </td>
                    
{/* image, manufacturer , model */}
                    <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={vehicle.specification.vehicleImage}
                        alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{vehicle.specification.manufacturer}</div>
                    <div className="text-sm opacity-50">{vehicle.specification.model}</div>
                  </div>
                </div>
              </td>

{/* Colour */}

              <td>{vehicle.specification.color}</td>

 {/*fuel */}

                <td>{vehicle.specification.fuelType}</td>


 {/*Transmission */}
 
                <td>{vehicle.specification.transmission}</td>                
                

 {/*Rate */}
 
                <td>ksh:{vehicle.rentalRate}</td>  


{/* Availability*/}
              <td>
                <div className={`badge badge-outline ${getStatusBadge(vehicle.availability)}`}>
                {vehicle.availability}</div>
              </td>

  {/*Location*/}
 
                <td>{vehicle.location?.name || "N/A"}</td>
            

{/* update and delete car */}
              <td>

              <button className="text-blue-500 hover:text-blue-400 btn btn-sm btn-outline"
              onClick={()=>handleEdit(vehicle.vehicleId)}>
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
