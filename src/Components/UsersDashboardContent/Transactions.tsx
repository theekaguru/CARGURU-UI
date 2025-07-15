
import { FaEyeSlash } from "react-icons/fa";

export const Transactions = () => {
  return (
    <>
      <div className="text-2xl font-bold text-center mb-4 text-orange-400">My Payments</div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Payment Date</th>
              <th>Car Booked</th>
              <th>Car Image</th>
              <th>Amount</th>
              <th>Days</th>
              <th>Status</th>
              <th>Hide</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>05/12/2024</td>
              <td>Volvo V40</td>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src="https://images.unsplash.com/photo-1606820073662-9db1c7c6cb5e"
                      alt="Volvo V40"
                    />
                  </div>
                </div>
              </td>
              <td>KES 7,000</td>
              <td>3</td>
              <td>
                <div className="badge badge-warning">Pending</div>
              </td>
              <td>
                <button className="btn btn-sm btn-outline text-red-600 hover:bg-red-100">
                  <FaEyeSlash className="text-lg" />
                </button>
              </td>
            </tr>

            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>10/01/2025</td>
              <td>Toyota Premio</td>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src="https://images.unsplash.com/photo-1616788376186-2a31fdd3c9d7"
                      alt="Toyota Premio"
                    />
                  </div>
                </div>
              </td>
              <td>KES 6,500</td>
              <td>2</td>
              <td>
                <div className="badge badge-success">Completed</div>
              </td>
              <td>
                <button className="btn btn-sm btn-outline text-red-600 hover:bg-red-100">
                  <FaEyeSlash className="text-lg" />
                </button>
              </td>
            </tr>

            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>22/03/2025</td>
              <td>BMW X5</td>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src="https://images.unsplash.com/photo-1605559424843-3b179b64d0e2"
                      alt="BMW X5"
                    />
                  </div>
                </div>
              </td>
              <td>KES 12,000</td>
              <td>4</td>
              <td>
                <div className="badge badge-error">Canceled</div>
              </td>
              <td>
                <button className="btn btn-sm btn-outline text-red-600 hover:bg-red-100">
                  <FaEyeSlash className="text-lg" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
