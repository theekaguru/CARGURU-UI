export const BookingHistory = () => {
  return (
    <>
      <div className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#11120f] via-[#988821] to-[#93141c]  animate-pulse">My Bookings</div>

      {/* Upcoming Section */}
      <div className="text-lg font-semibold mb-4">Upcoming</div>
      <div className="flex flex-col items-center justify-center bg-base-100 p-4 rounded-md shadow-md mb-8">
        <img
          src="https://via.placeholder.com/200x120?text=No+Upcoming+Bookings"
          alt="No Bookings"
          className="rounded-md mb-2"
        />
        <p className="text-md font-semibold">No upcoming bookings</p>
        <p className="text-sm text-gray-500 mb-2">
          You don't have any upcoming bookings. Start planning your next trip!
        </p>
        <button className="btn btn-sm btn-neutral">Rent a car</button>
      </div>

      {/* Past Section */}
      <div className="text-lg font-semibold mb-2">Past</div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Booking Date</th>
              <th>Return Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>12/05/2024</td>
              <td>15/05/2024</td>
              <td>$250</td>
              <td>
                <div className="badge badge-success badge-outline">Approved</div>
              </td>
            </tr>
            <tr>
              <td>01/04/2024</td>
              <td>05/04/2024</td>
              <td>$300</td>
              <td>
                <div className="badge badge-success badge-outline">Approved</div>
              </td>
            </tr>
            <tr>
              <td>15/03/2024</td>
              <td>18/03/2024</td>
              <td>$200</td>
              <td>
                <div className="badge badge-success badge-outline">Approved</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
