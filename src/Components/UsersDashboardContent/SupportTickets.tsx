import { PuffLoader } from "react-spinners";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { supportTicketApi } from "../../../features/api/supportTicketApi";

interface Ticket {
  ticketId: number;
  userId: number;
  subject: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: {
    userId: number;
    firstname: string;
    lastname: string;
    email: string;
    contactPhone: string;
    profileImage: string;
  };
}

export const SupportTickets = () => {
  // ✅ Getting auth state from Redux
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const userId = user?.userId;

  // ✅ Fetch all support tickets
  const {
    data: allTicketsData = [],
    isLoading,
    error,
    refetch,
  } = supportTicketApi.useGetAllSupportTicketsQuery(userId, {
    skip: !isAuthenticated,
  });

  // ✅ Mutation hook to update ticket status
  const [updateTicket] = supportTicketApi.useUpdateSupportTicketMutation();

  // ✅ Mutation hook to delete ticket
  const [deleteTicket] = supportTicketApi.useDeleteSupportTicketMutation();

  console.log("🚀 ~ SupportTickets ~ allTicketsData:", allTicketsData);

  // ✅ Utility: Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // ✅ Utility: Set badge color class based on ticket status
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-red-100 text-red-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  // ✅ Utility: Determine category from subject (simple implementation)
  const getTicketCategory = (subject: string) => {
    const lowerSubject = subject.toLowerCase();
    if (lowerSubject.includes("payment")) return "payment";
    if (lowerSubject.includes("account")) return "account";
    if (lowerSubject.includes("booking")) return "booking";
    if (lowerSubject.includes("vehicle")) return "vehicle";
    return "general";
  };

  // ✅ Handle ticket status update
  const handleStatusUpdate = async (ticketId: number, newStatus: string) => {
    try {
      await updateTicket({
        ticketId,
        status: newStatus,
      }).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to update ticket status:", err);
    }
  };

  // ✅ Handle ticket deletion
  const handleDeleteTicket = async (ticketId: number) => {
    try {
      await deleteTicket(ticketId).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to delete ticket:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Support Center</h1>
        <p className="text-gray-600">
          Get help with your account, bookings, and payments
        </p>
      </div>

      {error ? (
        <div className="text-red-500">
          Something went wrong. Please try again.
        </div>
      ) : isLoading ? (
        <div className="loading flex flex-col items-center justify-center">
          <PuffLoader />
          <span>Loading tickets...</span>
        </div>
      ) : allTicketsData?.length === 0 ? (
        <div className="bg-[#625757]  rounded-lg shadow-sm p-6 border border-gray-200 text-center">
          <h3 className="font-semibold text-gray-800 mb-2">
            No support tickets found
          </h3>
          <p className="text-gray-500">
            You haven't created any support tickets yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* My Support Tickets Section */}
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                My Support Tickets
              </h2>
              <p className="text-gray-600 text-sm">
                Track and manage your support requests
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center bg-[#d3cece]  rounded-lg shadow-sm px-4 py-2 border border-gray-200">
                <input
                  type="checkbox"
                  id="search-tickets"
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor="search-tickets" className="text-gray-600 text-sm">
                  Search tickets...
                </label>
              </div>
              <div className="flex items-center bg-[#d3cece]  rounded-lg shadow-sm px-4 py-2 border border-gray-200">
                <input
                  type="checkbox"
                  id="all-categories"
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor="all-categories" className="text-gray-600 text-sm">
                  All Categories
                </label>
              </div>
              <div className="flex items-center bg-[#d3cece]  rounded-lg shadow-sm px-4 py-2 border border-gray-200">
                <input
                  type="checkbox"
                  id="all-status"
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor="all-status" className="text-gray-600 text-sm">
                  All Status
                </label>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Tickets List */}
          <div className="space-y-4">
            {allTicketsData?.map((ticket: Ticket) => (
              <div
                key={ticket.ticketId}
                className="bg-[#838383]  rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800">{ticket.subject}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusUpdate(ticket.ticketId, "closed")}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => handleDeleteTicket(ticket.ticketId)}
                      className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{ticket.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  {/* User info with safe access */}
                  <div className="flex items-center">
                    <div className="avatar mr-2">
                      <div className="mask mask-squircle h-8 w-8">
                        <img
                          src={ticket.user?.profileImage || '/default-avatar.png'}
                          alt="user avatar"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/default-avatar.png';
                          }}
                        />
                      </div>
                    </div>
                    <span className="text-gray-700">
                      {ticket.user ? `${ticket.user.firstname} ${ticket.user.lastname}` : 'Unknown User'}
                    </span>
                  </div>

                  {/* Category badge */}
                  <span className={`px-2 py-1 rounded ${getStatusBadge(getTicketCategory(ticket.subject))}`}>
                    {getTicketCategory(ticket.subject)}
                  </span>

                  {/* Status badge */}
                  <span className={`px-2 py-1 rounded ${getStatusBadge(ticket.status)}`}>
                    {ticket.status}
                  </span>

                  {/* Date */}
                  <span className="text-gray-500">
                    {formatDate(ticket.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};