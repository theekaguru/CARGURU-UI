import { FiEdit} from "react-icons/fi";
import { PuffLoader } from "react-spinners";
import { useSelector } from "react-redux";

import { vehicleSpecApi } from "../../../features/api/vehicleSpecApi";
import type { RootState } from "../../../app/store";
import Swal from "sweetalert2";
import { AiFillDelete } from "react-icons/ai";

interface CarSpecificationInterface {
  vehicleSpecId: number;
  vehicleImage:string;
  manufacturer: string;
  model: string;
  year: number;
  fuelType: string;
  engineCapacity: string;
  transmission: string;
  seatingCapacity: number;
  color: string;
  features: string;
  numberPlate:string;
}

export const CarSpecifications = () => {
  
    const {user , isAuthenticated} =useSelector((state:RootState)=>state.auth)
    const [updateVehicleSpecStatus] = vehicleSpecApi.useUpdateVehicleSpecificationMutation()
  
    const userId =user?.userId;
  
    const {data:allVehicleSpecificationData=[] , isLoading , error} = vehicleSpecApi.useGetAllVehicleSpecificationsQuery(userId,{
    skip:!isAuthenticated
    });
    
    console.log("🚀~Vehiclespc~VehicleSpecData:",allVehicleSpecificationData)
  
    const handleEdit = async (VehicleId: number) => {
      Swal.fire({
        title: "Are you sure?",
        text: "you want to cancel the VehicleSpec?",
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
            const res = await updateVehicleSpecStatus(updatePayload).unwrap()
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
        Car Specs
      </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
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
                error ? (
                  <tr>
                    <td colSpan={11}>
                      <div className="text-red-400">
                        something went Wrong try Again .....
                      </div>
                    </td>
                  </tr>
                ): isLoading ? (
                  <tr>
                    <td colSpan={11}>
                      <div>
                       <PuffLoader color="#0aff13"/>
                      </div>
                    </td>
                  </tr>
                ) : allVehicleSpecificationData?.length === 0 ? (
                  <tr>
                    <td colSpan={11}>
                      <div>No Orders Available</div>
                    </td>
                  </tr>
                ):( 
                  allVehicleSpecificationData?.map((vehicleSpec:CarSpecificationInterface)=>( 
                    <tr key={vehicleSpec.vehicleSpecId}>

{/* vehicleSpeId id */}
                      <td>
                        {vehicleSpec.vehicleSpecId}
                      </td>
                      
{/* image, manufacturer , model */}
                      <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={vehicleSpec.vehicleImage}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{vehicleSpec.manufacturer}</div>
                      <div className="text-sm opacity-50">{vehicleSpec.model}</div>
                    </div>
                  </div>
                </td>

{/* Year*/}

                <td>{vehicleSpec.year}</td>
{/* FuelType */}

                <td>{vehicleSpec.fuelType}</td>

{/* Engine Capacity */}

                <td>{vehicleSpec.engineCapacity}</td>


{/* Transmission */}
   
                <td>{vehicleSpec.transmission}</td>                
                  

{/* Number Of Seats */}
   
                <td>{vehicleSpec.seatingCapacity}</td>  


{/* Colour*/}
                <td>{vehicleSpec.color}</td>

{/*features*/}
   
                <td>{vehicleSpec.features}</td>

{/*NumberPlate*/}
   
                <td>{vehicleSpec.numberPlate}</td>                

{/* update and delete car */}
                <td>
                <button className="text-blue-500 hover:text-blue-400 btn btn-sm btn-outline"
                onClick={()=>handleEdit(vehicleSpec.vehicleSpecId)}>
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
