import { FiEdit } from "react-icons/fi"

export const Users = () => {
return (
    <>
      <div className="text-2xl font-bold text-center mb-4 text-orange-400">All Users Page</div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th> # </th>
              <th>User</th>
              <th>Joined On</th>
              <th>User Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>
                1
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-orange-500">John Doe</div>
                    <div className="text-sm opacity-50">john@mail.com</div>
                  </div>
                </div>
              </td>
              
              <td> 18/06/2025</td>
              <th>
                <div className="badge badge-outline badge-success">Admin</div>
              </th>
              <th>
                
                <button
                  className="btn btn-sm btn-outline text-blue-700 hover:text-blue-500 ml-1 mt-1 hover:bg-red-700"
                  
                >
                  <FiEdit />
                </button>
              </th>
            </tr>
            {/* row 2 */}
            <tr>
              <th>
                2
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                        alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Jane Smith</div>
                    <div className="text-sm opacity-50">jane@mail.com</div>
                  </div>
                </div>
              </td>
              
              <td>     18/06/2025</td>
              <th>
                <div className="badge badge-outline badge-error">disabled</div>
              </th>
              <th>
                
                <button
                  className="btn btn-sm btn-outline text-blue-700 hover:text-blue-500 ml-1  hover:bg-red-700"
                  
                >
                  <FiEdit />
                </button>
              </th>
            </tr>
            {/* row 3 */}
            <tr>
              <th>
                3
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                        alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Jane Doe</div>
                    <div className="text-sm opacity-50">doe@mail.com</div>
                  </div>
                </div>
              </td>             
              <td>     18/06/2025</td>
              <th>
                <div className="badge badge-outline badge-warning">Member</div>
              </th>
              <th>
                <button className="text-blue-700 hover:text-blue-500 btn btn-sm btn-outline">
                  <FiEdit />
                </button>
                
              </th>
            </tr>
          </tbody>

        </table>
      </div>
    </>
  )
}

