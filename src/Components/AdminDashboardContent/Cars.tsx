import { FiEdit, FiTrash2 } from "react-icons/fi";

export const Cars = () => {
  return (
    <>
      <div className="text-2xl font-bold text-center mb-4 text-orange-400">All Cars</div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Model</th>
              <th>Make</th>
              <th>Car Image</th>
              <th>Year</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            <tr>
              <th>1</th>
              <td className="font-bold text-orange-500">Volvo V40</td>
              <td>Toyota</td>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src="https://images.unsplash.com/photo-1600180758890-9d3db04e5355?auto=format&fit=crop&w=800&q=80"
                      alt="Volvo V40"
                    />
                  </div>
                </div>
              </td>
              <td>2018</td>
              <td>Kiambu</td>
              <td>
                <div className="badge badge-outline badge-success">Available</div>
              </td>
              <td className="flex gap-1">
                <button className="btn btn-sm btn-outline text-green-700 hover:text-green-500">
                  <FiEdit />
                </button>
                <button className="btn btn-sm btn-outline text-red-700 hover:text-red-500">
                  <FiTrash2 />
                </button>
              </td>
            </tr>

            {/* Row 2 */}
            <tr>
              <th>2</th>
              <td className="font-bold text-orange-500">BMW X5</td>
              <td>BMW</td>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src="https://images.unsplash.com/photo-1617131931514-1d9e7faeb5cf?auto=format&fit=crop&w=800&q=80"
                      alt="BMW X5"
                    />
                  </div>
                </div>
              </td>
              <td>2021</td>
              <td>Nairobi</td>
              <td>
                <div className="badge badge-outline badge-success">Available</div>
              </td>
              <td className="flex gap-1">
                <button className="btn btn-sm btn-outline text-green-700 hover:text-green-500">
                  <FiEdit />
                </button>
                <button className="btn btn-sm btn-outline text-red-700 hover:text-red-500">
                  <FiTrash2 />
                </button>
              </td>
            </tr>

            {/* Row 3 */}
            <tr>
              <th>3</th>
              <td className="font-bold text-orange-500">Mercedes C200</td>
              <td>Mercedes</td>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src="https://images.unsplash.com/photo-1609587312207-1e69c3e16010?auto=format&fit=crop&w=800&q=80"
                      alt="Mercedes"
                    />
                  </div>
                </div>
              </td>
              <td>2022</td>
              <td>Ruiru</td>
              <td>
                <div className="badge badge-outline badge-error">Unavailable</div>
              </td>
              <td className="flex gap-1">
                <button className="btn btn-sm btn-outline text-green-700 hover:text-green-500">
                  <FiEdit />
                </button>
                <button className="btn btn-sm btn-outline text-red-700 hover:text-red-500">
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
