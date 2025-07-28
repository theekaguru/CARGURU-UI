import { PuffLoader } from "react-spinners";
import { supportTicketApi } from "../../../features/api/supportTicketApi";

interface Ticket {
  ticketId: number;
  userId: number;
  subject: string;
  description: string;
  status: string;
  priority?: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    firstname: string;
    lastname: string;
    email: string;
    profileImage?: string;
  };
}

export const AdminSupport = () => {
  // Fetch all support tickets for admin
  const {
    data: allTickets = [],
    isLoading,
    error,
    refetch,
  } = supportTicketApi.useGetAllSupportTicketsQuery({});

  // Mutation hooks for admin actions
  const [updateTicket] = supportTicketApi.useUpdateSupportTicketMutation();
  const [deleteTicket] = supportTicketApi.useDeleteSupportTicketMutation();

  // Calculate stats for the dashboard
  const calculateStats = () => {
    const total = allTickets.length;
    const open = allTickets.filter((t: Ticket) => t.status.toLowerCase() === 'open').length;
    const inProgress = allTickets.filter((t: Ticket) => t.status.toLowerCase() === 'in progress').length;
    const resolved = allTickets.filter((t: Ticket) => t.status.toLowerCase() === 'resolved').length;

    return {
      total,
      open,
      inProgress,
      resolved,
      avgRating: 5.0 // Placeholder - replace with actual rating calculation if available
    };
  };

  const stats = calculateStats();

  // Format date to readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  // Get badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get badge color based on priority
  const getPriorityBadge = (priority?: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bg-purple-100 text-purple-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle status update
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

  if (isLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto flex justify-center items-center h-64">
        <PuffLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-6xl mx-auto text-red-500">
        Error loading support tickets. Please try again.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Support Dashboard</h1>
      <p className="text-gray-600 mb-8">Manage and resolve customer support tickets</p>

      {/* Stats Overview */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="pb-2">Total Tickets</th>
              <th className="pb-2">Open</th>
              <th className="pb-2">In Progress</th>
              <th className="pb-2">Resolved</th>
              <th className="pb-2">Avg Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-gray-800 font-medium">
              <td className="py-2">{stats.total}</td>
              <td className="py-2">{stats.open}</td>
              <td className="py-2">{stats.inProgress}</td>
              <td className="py-2">{stats.resolved}</td>
              <td className="py-2">{stats.avgRating}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Support Tickets Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Support Tickets</h2>
        <p className="text-gray-600 mb-4">Manage customer support requests</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center bg-white rounded-lg shadow px-4 py-2">
          <input
            type="checkbox"
            id="search-tickets"
            className="mr-2"
          />
          <label htmlFor="search-tickets" className="text-gray-600">Search tickets...</label>
        </div>
        <div className="flex items-center bg-white rounded-lg shadow px-4 py-2">
          <input
            type="checkbox"
            id="all-categories"
            className="mr-2"
          />
          <label htmlFor="all-categories" className="text-gray-600">All Categories</label>
        </div>
        <div className="flex items-center bg-white rounded-lg shadow px-4 py-2">
          <input
            type="checkbox"
            id="all-status"
            className="mr-2"
          />
          <label htmlFor="all-status" className="text-gray-600">All Status</label>
        </div>
        <div className="flex items-center bg-white rounded-lg shadow px-4 py-2">
          <input
            type="checkbox"
            id="all-priority"
            className="mr-2"
          />
          <label htmlFor="all-priority" className="text-gray-600">All Priority</label>
        </div>
      </div>

      <div className="space-y-4">
        {allTickets.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
            No support tickets found
          </div>
        ) : (
          allTickets.map((ticket: Ticket) => {
            const userName = ticket.user
              ? `${ticket.user.firstname || ''} ${ticket.user.lastname || ''}`.trim()
              : 'Unknown User';
            const userEmail = ticket.user?.email || 'No email provided';

            return (
              <div key={ticket.ticketId} className="bg-white rounded-lg shadow p-6">
                <div className="border-b pb-4 mb-4">
                  <h3 className="font-semibold text-lg">{ticket.subject}</h3>
                  <p className="text-gray-600">
                    - {userName} ({userEmail})
                  </p>
                  <p className="mt-2">{ticket.description}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {ticket.subject.split(' ')[0]} {/* Simple category from first word */}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(ticket.status)}`}>
                    {ticket.status}
                  </span>
                  {ticket.priority && (
                    <span className={`px-3 py-1 rounded-full text-sm ${getPriorityBadge(ticket.priority)}`}>
                      {ticket.priority} priority
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-gray-500 text-sm">[{formatDate(ticket.createdAt)}]</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusUpdate(ticket.ticketId, 'Resolved')}
                      className="text-xs px-3 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200"
                    >
                      Resolve
                    </button>
                    <button
                      onClick={() => deleteTicket(ticket.ticketId)}
                      className="text-xs px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};