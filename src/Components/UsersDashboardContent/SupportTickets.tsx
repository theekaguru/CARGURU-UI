export const SupportTickets = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Support Center</h1>
        <p className="text-gray-600">Get help with your account, bookings, and payments</p>
      </div>

      <div className="space-y-6">
        {/* My Support Tickets Section */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">My Support Tickets</h2>
            <p className="text-gray-600 text-sm">Track and manage your support requests</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center bg-white rounded-lg shadow-sm px-4 py-2 border border-gray-200">
              <input
                type="checkbox"
                id="search-tickets"
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="search-tickets" className="text-gray-600 text-sm">Search tickets...</label>
            </div>
            <div className="flex items-center bg-white rounded-lg shadow-sm px-4 py-2 border border-gray-200">
              <input
                type="checkbox"
                id="all-categories"
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="all-categories" className="text-gray-600 text-sm">All Categories</label>
            </div>
            <div className="flex items-center bg-white rounded-lg shadow-sm px-4 py-2 border border-gray-200">
              <input
                type="checkbox"
                id="all-status"
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="all-status" className="text-gray-600 text-sm">All Status</label>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Tickets List */}
        <div className="space-y-4">
          {/* Ticket 1 */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-2">Payment not processed</h3>
            <p className="text-gray-600 mb-4">My payment was deducted but booking wasn't confirmed</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">payment</span>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded">open</span>
              <span className="text-gray-500">2024-01-15</span>
            </div>
          </div>

          {/* Ticket 2 */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-2">Cannot access my account</h3>
            <p className="text-gray-600 mb-4">Forgot password reset not working</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">account</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">resolved</span>
              <span className="text-gray-500">2024-01-14</span>
            </div>
          </div>

          {/* Ticket 3 - Empty State */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 text-center">
            <h3 className="font-semibold text-gray-800 mb-2">Booking cancellation issue</h3>
            <p className="text-gray-500">Select a ticket to view details</p>
          </div>
        </div>
      </div>
    </div>
  );
};