import { PuffLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { supportTicketApi } from "../../features/api/supportTicketApi";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaTimes, FaPlus } from "react-icons/fa";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { RootState } from "../../app/store";

interface Ticket {
  ticketId: number;
  userId: number;
  subject: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

type TicketFormValues = {
  subject: string;
  description: string;
};

const subjectOptions = [
  "Payment",
  "Booking",
  "Vehicle",
  "Location",
  "MyAccount"
];

export const SupportTickets = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const userId = user?.userId;

  // Fetch all support tickets for the authenticated user
  const {
    data: allTicketsData = [],
    isLoading,
    error,
    refetch,
  } = supportTicketApi.useGetAllSupportTicketsQuery(undefined, {
    skip: !isAuthenticated,
  });

  // For fetching individual ticket details
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const { data: singleTicket } = supportTicketApi.useGetSupportTicketByIdQuery(
    selectedTicketId as number,
    { skip: !selectedTicketId }
  );

  // Mutation hooks
  const [createTicket] = supportTicketApi.useCreateSupportTicketMutation();
  const [deleteTicket] = supportTicketApi.useDeleteSupportTicketMutation();

  // Form handling
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TicketFormValues>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
    reset();
  };

  const handleViewDetails = (ticketId: number) => {
    setSelectedTicketId(ticketId);
    setIsDetailModalOpen(true);
  };

  // Create ticket submission
const onSubmit: SubmitHandler<TicketFormValues> = async (data) => {
  const loadingToastId = toast.loading("Creating ticket...");
  
  try {
    await createTicket({
      subject: data.subject,
      description: data.description,
      status: "Open", 
      userId: userId!
    }).unwrap();
    
    toast.success("Ticket created successfully", { id: loadingToastId });
    handleModalToggle();
    refetch();
  } catch (err) {
    toast.error("Failed to create ticket", { id: loadingToastId });
  }
};

  // Delete ticket with confirmation
  const handleDelete = async (ticketId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ticket?");
    if (!confirmDelete) return;

    const loadingToastId = toast.loading("Deleting ticket...");
    try {
      await deleteTicket(ticketId).unwrap();
      toast.success("Ticket deleted successfully", { id: loadingToastId });
      refetch();
    } catch (err) {
      toast.error("Failed to delete ticket", { id: loadingToastId });
    }
  };

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "Open":
      return "bg-red-100 text-red-800";
    case "Resolved":
      return "bg-green-100 text-green-800";
    case "InProgress": // Added this case if your backend uses "InProgress"
      return "bg-yellow-100 text-yellow-800";
    case "Closed":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-blue-100 text-blue-800";
  }
};

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="max-w-4xl mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Support Center</h1>
          <p className="text-gray-600">
            Get help with your account, bookings, and payments
          </p>
          <button
            className="btn btn-warning mt-4 flex items-center gap-2"
            onClick={handleModalToggle}
          >
            <FaPlus /> Create Ticket
          </button>
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
          <div className="bg-[#625757] rounded-lg shadow-sm p-6 border border-gray-200 text-center">
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

              {/* Tickets List */}
              <div className="space-y-4">
                {allTicketsData?.map((ticket: Ticket) => (
                  <div
                    key={ticket.ticketId}
                    className="bg-[#838383] rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleViewDetails(ticket.ticketId)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800">{ticket.subject}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${getStatusBadge(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(ticket.ticketId);
                        }}
                        className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                      >
                        <AiFillDelete />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{ticket.description}</p>
                    <div className="text-sm text-gray-500">
                      Created: {formatDate(ticket.createdAt)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Create Ticket Modal */}
        {isModalOpen && (
          <div className="modal modal-open">
            <div className="modal-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-orange-500">
                  Create Support Ticket
                </h2>
                <button 
                  onClick={handleModalToggle} 
                  className="btn btn-circle btn-sm"
                >
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-orange-500 mb-1">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      className="select select-bordered w-full"
                      {...register("subject", { required: "Subject is required" })}
                    >
                      <option value="">Select a subject</option>
                      {subjectOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-orange-500 mb-1">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      className="textarea textarea-bordered w-full"
                      rows={4}
                      placeholder="Describe your issue in detail..."
                      {...register("description", { 
                        required: "Description is required",
                        minLength: {
                          value: 10,
                          message: "Description must be at least 10 characters"
                        }
                      })}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                  >
                    Submit Ticket
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Ticket Detail Modal */}
        {isDetailModalOpen && singleTicket && (
          <div className="modal modal-open">
            <div className="modal-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-orange-500">
                  Ticket Details
                </h2>
                <button 
                  onClick={() => setIsDetailModalOpen(false)} 
                  className="btn btn-circle btn-sm"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800">{singleTicket.subject}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${getStatusBadge(singleTicket.status)}`}>
                    {singleTicket.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Description:</h4>
                  <p className="text-gray-600 whitespace-pre-line">{singleTicket.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Created:</span>
                    <span className="text-gray-700 ml-2">{formatDate(singleTicket.createdAt)}</span>
                  </div>
                  {singleTicket.updatedAt !== singleTicket.createdAt && (
                    <div>
                      <span className="text-gray-500">Updated:</span>
                      <span className="text-gray-700 ml-2">{formatDate(singleTicket.updatedAt)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};