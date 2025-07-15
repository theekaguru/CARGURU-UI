import { FiEye } from "react-icons/fi";
import { MdOutlineCheckCircle, MdOutlineCancel } from "react-icons/md";

export const Bookings = () => {
  return (
    <>
      <div className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#11120f] via-[#988821] to-[#93141c]  animate-pulse">All Bookings Page</div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Car Image</th>
              <th>Car Booked</th>
              <th>Days Booked</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            <tr>
              <th>1</th>
              <td className="font-bold text-[#3d3935]">Daniel Kaguru</td>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src="https://source.unsplash.com/80x80/?landcruiser,toyota"
                      alt="Landcruiser"
                    />
                  </div>
                </div>
              </td>
              <td>Landcruiser</td>
              <td>5</td>
              <td>$2000</td>
              <td>
                <div className="badge badge-outline badge-warning">Pending</div>
              </td>
              <td>29th Mon June - 3rd Tue July</td>
              <td>Garden City</td>
              <td className="flex gap-1">
                <button className="btn btn-sm btn-outline text-blue-700 hover:text-blue-500">
                  <FiEye />
                </button>
                <button className="btn btn-sm btn-outline text-green-600 hover:text-green-400">
                  <MdOutlineCheckCircle />
                </button>
                <button className="btn btn-sm btn-outline text-red-600 hover:text-red-400">
                  <MdOutlineCancel />
                </button>
              </td>
            </tr>

            {/* Row 2 */}
            <tr>
              <th>2</th>
              <td className="font-bold text-[#3d3935]">Jane Mwangi</td>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src="https://source.unsplash.com/80x80/?toyota,prado,suv"
                      alt="Toyota Prado"
                    />
                  </div>
                </div>
              </td>
              <td>Toyota Prado</td>
              <td>3</td>
              <td>$1200</td>
              <td>
                <div className="badge badge-outline badge-success">Approved</div>
              </td>
              <td>10th Wed July - 13th Sat July</td>
              <td>Westlands</td>
              <td className="flex gap-1">
                <button className="btn btn-sm btn-outline text-blue-700 hover:text-blue-500">
                  <FiEye />
                </button>
                <button className="btn btn-sm btn-outline text-green-600 hover:text-green-400">
                  <MdOutlineCheckCircle />
                </button>
                <button className="btn btn-sm btn-outline text-red-600 hover:text-red-400">
                  <MdOutlineCancel />
                </button>
              </td>
            </tr>

            {/* Row 3 */}
            <tr>
              <th>3</th>
              <td className="font-bold text-[#3d3935]">Kevin Otieno</td>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src="https://source.unsplash.com/80x80/?mercedes,benz,car"
                      alt="Mercedes Benz"
                    />
                  </div>
                </div>
              </td>
              <td>Mercedes Benz</td>
              <td>2</td>
              <td>$900</td>
              <td>
                <div className="badge badge-outline badge-error">Declined</div>
              </td>
              <td>5th Fri July - 6th Sat July</td>
              <td>Ridgeways</td>
              <td className="flex gap-1">
                <button className="btn btn-sm btn-outline text-blue-700 hover:text-blue-500">
                  <FiEye />
                </button>
                <button className="btn btn-sm btn-outline text-green-600 hover:text-green-400">
                  <MdOutlineCheckCircle />
                </button>
                <button className="btn btn-sm btn-outline text-red-600 hover:text-red-400">
                  <MdOutlineCancel />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
