import { useEffect, useState } from "react";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";

// Define TypeScript interfaces
interface IBooking {
  bookingId: number;
  userId: number;
  vehicleId: number;
  locationId: number;
  bookingDate: string;
  returnDate: string;
  totalAmount: string;
  bookingStatus: string;
  createdAt: string;
  updatedAt: string;
}

interface ISupportTicket {
  ticketId: number;
  userId: number;
  subject: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface IUser {
  userId: number;
  firstname: string;
  lastname: string;
  email: string;
  contactPhone: string;
  address: string;
  userType: string;
  emailVerified: boolean;
  profileImage: string;
  createdAt: string;
  updatedAt: string;
  bookings: IBooking[];
  supportTickets: ISupportTicket[];
}

export const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user");
        const data = await res.json();

        // Handle both single user or array of users from backend
        const formattedData = Array.isArray(data) ? data : [data];
        setUsers(formattedData);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#11120f] via-[#988821] to-[#93141c] animate-pulse">
        All Users Page
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Joined On</th>
              <th>User Type</th>
              <th>Total Bookings</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.userId}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.profileImage}
                          alt={`${user.firstname} ${user.lastname}`}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {user.firstname} {user.lastname}
                      </div>
                      <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className={`badge badge-outline ${
                    user.userType === "admin"
                      ? "badge-success"
                      : user.userType === "disabled"
                      ? "badge-error"
                      : "badge-warning"
                  }`}>
                    {user.userType.charAt(0).toUpperCase() + user.userType.slice(1)}
                  </div>
                </td>
                <td>{user.bookings?.length || 0}</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
