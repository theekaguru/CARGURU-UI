import { FiEye } from "react-icons/fi";
import { MdOutlineCheckCircle, MdOutlineCancel } from "react-icons/md";

export const Bookings = () => {
  return (
    <>
      <div className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#11120f] via-[#988821] to-[#93141c] animate-pulse">
        All Bookings Page
      </div>
      <div className="overflow-x-auto">
        <table className="table">
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
              <td className="font-bold text-[#3d3935]">kaguru tests</td>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src="https://cdn.example.com/images/mazda_cx5.jpg"
                      alt="Mazda CX-5"
                    />
                  </div>
                </div>
              </td>
              <td>Mazda CX-5</td>
              <td>2</td>
              <td>$10000</td>
              <td>
                <div className="badge badge-outline badge-success">Confirmed</div>
              </td>
              <td>5th Sat July - 7th Mon July</td>
              <td>Nairobi HQ</td>
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

            {/* Add more static rows here as needed */}
          </tbody>
        </table>
      </div>
    </>
  );
};
