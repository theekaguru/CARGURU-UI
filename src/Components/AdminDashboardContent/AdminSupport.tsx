import { PuffLoader } from "react-spinners";
import { supportTicketApi } from "../../features/api/supportTicketApi";
import { Toaster, toast } from "sonner";
import { FiChevronDown } from "react-icons/fi";
import { useGetUserByIdQuery } from "../../features/api/userApi"; // Add this import

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

// Add this component for user details
const UserDetails = ({ userId }: { userId: number }) => {
  const { data: user, isLoading, isError } = useGetUserByIdQuery(userId, {
    skip: !userId
  });

  if (isLoading) return <span className="text-gray-500">Loading user...</span>;
  if (isError) return <span className="text-gray-500">User data error</span>;

  const userName = user ? `${user.firstname || ''} ${user.lastname || ''}`.trim() : 'Unknown User';
  const userEmail = user?.email || 'No email provided';

  return (
    <span>
      {userName} • {userEmail}
    </span>
  );
};

export const AdminSupport = () => {
  // Fetch all support tickets
  const {
    data: allTickets = [],
    isLoading,
    error,
    refetch,
  } = supportTicketApi.useGetAllSupportTicketsQuery({});

  // Mutation hooks
  const [updateTicket] = supportTicketApi.useUpdateSupportTicketMutation();

  // Calculate stats for the dashboard
  const calculateStats = () => {
    const total = allTickets.length;
    const open = allTickets.filter((t: Ticket) => t.status.toLowerCase() === 'open').length;
    const inProgress = allTickets.filter((t: Ticket) => t.status.toLowerCase() === 'inprogress').length;
    const resolved = allTickets.filter((t: Ticket) => t.status.toLowerCase() === 'resolved').length;

    return {
      total,
      open,
      inProgress,
      resolved,
    };
  };

  const stats = calculateStats();

  // Format date to readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Status badge colors matching user support tickets
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'inprogress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  // Priority badge colors
  const getPriorityBadge = (priority?: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bg-purple-100 text-purple-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBackground = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-red-100/20 border-red-200';
      case 'inprogress': return 'bg-amber-100/20 border-amber-200';
      case 'resolved': return 'bg-emerald-100/20 border-emerald-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  // Handle status update with toast notification
  const handleStatusUpdate = async (ticketId: number, newStatus: string) => {
    const loadingToastId = toast.loading("Updating ticket status...");
    try {
      await updateTicket({
        ticketId,
        status: newStatus,
      }).unwrap();
      toast.success("Ticket status updated successfully", { id: loadingToastId });
      refetch();
    } catch (err) {
      toast.error("Failed to update ticket status", { id: loadingToastId });
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto flex justify-center items-center h-64">
        <PuffLoader color="#0aff13" />
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
    <>
      <Toaster richColors position="top-right" />
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#11120f] via-[#988821] to-[#93141c] animate-pulse p-4 rounded-lg text-white">
          Support Dashboard
        </h1>
        <p className="text-gray-600 mb-8">Manage and resolve customer support tickets</p>

        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-100/20 p-4 rounded-lg border border-blue-200 shadow-sm">
            <h3 className="font-bold text-blue-700">Total Tickets</h3>
            <p className="text-2xl text-blue-900">{stats.total}</p>
          </div>
          <div className="bg-red-100/20 p-4 rounded-lg border border-red-200 shadow-sm">
            <h3 className="font-bold text-red-700">Open</h3>
            <p className="text-2xl text-red-900">{stats.open}</p>
          </div>
          <div className="bg-amber-100/20 p-4 rounded-lg border border-amber-200 shadow-sm">
            <h3 className="font-bold text-amber-700">In Progress</h3>
            <p className="text-2xl text-amber-900">{stats.inProgress}</p>
          </div>
          <div className="bg-emerald-100/20 p-4 rounded-lg border border-emerald-200 shadow-sm">
            <h3 className="font-bold text-emerald-700">Resolved</h3>
            <p className="text-2xl text-emerald-900">{stats.resolved}</p>
          </div>
        </div>

        {/* Support Tickets Section */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Support Tickets</h2>
          <p className="text-gray-600 mb-4">Manage customer support requests</p>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {allTickets.length === 0 ? (
            <div className="bg-gray-50 rounded-lg shadow p-6 text-center text-gray-500 border border-gray-100">
              No support tickets found
            </div>
          ) : (
            allTickets.map((ticket: Ticket) => (
              <div 
                key={ticket.ticketId} 
                className={`${getStatusBackground(ticket.status)} rounded-lg shadow-sm p-6 border hover:bg-opacity-50 transition-colors`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">{ticket.subject}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      <UserDetails userId={ticket.userId} />
                    </p>
                  </div>
                  <div className="relative">
                    <select
                      value={ticket.status}
                      onChange={(e) => handleStatusUpdate(ticket.ticketId, e.target.value)}
                      className={`appearance-none rounded-md pl-3 pr-8 py-1 text-sm focus:outline-none focus:ring-2 ${
                        ticket.status === 'Open' ? 
                          'bg-gradient-to-r from-red-100/30 to-red-200/20 border-red-200 focus:ring-red-300 text-red-800' :
                        ticket.status === 'InProgress' ? 
                          'bg-gradient-to-r from-amber-100/30 to-amber-200/20 border-amber-200 focus:ring-amber-300 text-amber-800' :
                          'bg-gradient-to-r from-emerald-100/30 to-emerald-200/20 border-emerald-200 focus:ring-emerald-300 text-emerald-800'
                      } border`}
                    >
                      <option value="Open" className="bg-red-50 text-red-800">Open</option>
                      <option value="InProgress" className="bg-amber-50 text-amber-800">In Progress</option>
                      <option value="Resolved" className="bg-emerald-50 text-emerald-800">Resolved</option>
                    </select>
                    <FiChevronDown className="absolute right-3 top-2 text-gray-600" size={16} />
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{ticket.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 rounded ${getStatusBadge(ticket.status)}`}>
                    {ticket.status}
                  </span>
                  {ticket.priority && (
                    <span className={`px-2 py-1 rounded ${getPriorityBadge(ticket.priority)}`}>
                      {ticket.priority} priority
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Created: {formatDate(ticket.createdAt)}</span>
                  {ticket.updatedAt !== ticket.createdAt && (
                    <span>Updated: {formatDate(ticket.updatedAt)}</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};