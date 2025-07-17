import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";

export const Users = () => {
  // Mock static user data
  const users = [
    {
      userId: 1,
      firstname: "Kaguru",
      lastname: "Tests",
      email: "kagurutest@gmail.com",
      contactPhone: "0712345678",
      address: "123 Nairobi Street",
      emailVerified: true,
      userType: "admin",
      profileImage: "https://cdn.example.com/images/admin_kaguru.jpg",
      bookings: [
        { totalAmount: "10000" },
        { totalAmount: "8000" },
      ],
    },
    {
      userId: 2,
      firstname: "Jane",
      lastname: "Doe",
      email: "jane.doe@example.com",
      contactPhone: "0722334455",
      address: "456 Kiambu Road",
      emailVerified: false,
      userType: "member",
      profileImage: "https://cdn.example.com/images/jane.jpg",
      bookings: [
        { totalAmount: "2000" },
      ],
    },
    {
      userId: 3,
      firstname: "John",
      lastname: "Smith",
      email: "johnsmith@example.com",
      contactPhone: "0799988776",
      address: "789 Westlands",
      emailVerified: true,
      userType: "disabled",
      profileImage: "https://cdn.example.com/images/john.jpg",
      bookings: [],
    },
  ];

  return (
    <>
      <div className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#11120f] via-[#988821] to-[#93141c] animate-pulse">
        All Users Page
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Email Verified</th>
              <th>Total Bookings</th>
              <th>Total Amount (Ksh)</th>
              <th>User Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const fullName = `${user.firstname} ${user.lastname}`;
              const totalBookings = user.bookings.length;
              const totalAmount = user.bookings
                .reduce((sum, b) => sum + Number(b.totalAmount), 0)
                .toLocaleString();

              return (
                <tr key={user.userId}>
                  <th>{user.userId}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.profileImage} alt={fullName} />
                      </div>
                    </div>
                  </td>
                  <td className="font-bold">{fullName}</td>
                  <td className="text-sm opacity-90">{user.email}</td>
                  <td>{user.contactPhone}</td>
                  <td>{user.address}</td>
                  <td>
                    <div
                      className={`badge ${
                        user.emailVerified
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {user.emailVerified ? "Verified" : "Not Verified"}
                    </div>
                  </td>
                  <td>{totalBookings}</td>
                  <td>{totalAmount}</td>
                  <td>
                    <div
                      className={`badge badge-outline ${
                        user.userType === "admin"
                          ? "badge-success"
                          : user.userType === "member"
                          ? "badge-warning"
                          : "badge-error"
                      }`}
                    >
                      {user.userType.charAt(0).toUpperCase() +
                        user.userType.slice(1)}
                    </div>
                  </td>
                  <td className="flex gap-1">
                    <button className="btn btn-sm btn-outline text-blue-700 hover:text-blue-500">
                      <FiEye />
                    </button>
                    <button className="btn btn-sm btn-outline text-green-700 hover:text-green-500">
                      <FiEdit />
                    </button>
                    <button className="btn btn-sm btn-outline text-red-700 hover:text-red-500">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
