export const AdminSupport = () => {
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
              <td className="py-2">3</td>
              <td className="py-2">1</td>
              <td className="py-2">1</td>
              <td className="py-2">1</td>
              <td className="py-2">5.0</td>
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
        {/* Ticket 1 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="border-b pb-4 mb-4">
            <h3 className="font-semibold text-lg">Payment not processed</h3>
            <p className="text-gray-600">- John Doe (john@example.com)</p>
            <p className="mt-2">My payment was deducted but booking wasn't confirmed</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Payment</span>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Open</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">High priority</span>
          </div>

          <p className="text-gray-500 text-sm">[2024-01-15]</p>
        </div>

        {/* Ticket 2 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="border-b pb-4 mb-4">
            <h3 className="font-semibold text-lg">Cannot access my account</h3>
            <p className="text-gray-600">- <strong>Jinns Smith</strong></p>
            <a href="https://example.com" className="text-blue-600 hover:underline">jinns@example.com</a>
          </div>
        </div>
      </div>
    </div>
  );
};