import { FiEdit, FiTrash2 } from "react-icons/fi";

export const CarSpecifications = () => {
  return (
    <>
      <div className="text-2xl font-bold text-center mb-4 text-orange-400">All Car Specifications</div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Model</th>
              <th>Make</th>
              <th>Year</th>
              <th>Fuel Type</th>
              <th>Engine Capacity</th>
              <th>Transmission</th>
              <th>Colour</th>
              <th>Seats</th>
              <th>Features</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            <tr>
              <th>1</th>
              <td className="font-bold text-orange-500">Volvo V40</td>
              <td>Toyota</td>
              <td>2018</td>
              <td>Petrol</td>
              <td>2000 cc</td>
              <td>Automatic</td>
              <td>Green</td>
              <td>4</td>
              <td>Sunroof, Cruise, Lane Assist</td>
              <td className="flex gap-1">
                <button className="btn btn-sm btn-outline text-green-700 hover:text-green-500">
                  <FiEdit />
                </button>
                <button className="btn btn-sm btn-outline text-red-700 hover:text-red-500">
                  <FiTrash2 />
                </button>
              </td>
            </tr>

            {/* Row 2 */}
            <tr>
              <th>2</th>
              <td className="font-bold text-orange-500">Honda Civic</td>
              <td>Honda</td>
              <td>2020</td>
              <td>Diesel</td>
              <td>1800 cc</td>
              <td>Manual</td>
              <td>Red</td>
              <td>5</td>
              <td>Heated Seats, ABS, Rear Camera</td>
              <td className="flex gap-1">
                <button className="btn btn-sm btn-outline text-green-700 hover:text-green-500">
                  <FiEdit />
                </button>
                <button className="btn btn-sm btn-outline text-red-700 hover:text-red-500">
                  <FiTrash2 />
                </button>
              </td>
            </tr>

            {/* Row 3 */}
            <tr>
              <th>3</th>
              <td className="font-bold text-orange-500">Mercedes C200</td>
              <td>Mercedes</td>
              <td>2022</td>
              <td>Petrol</td>
              <td>2200 cc</td>
              <td>Automatic</td>
              <td>Black</td>
              <td>5</td>
              <td>Lane Assist, Navigation, Sunroof</td>
              <td className="flex gap-1">
                <button className="btn btn-sm btn-outline text-green-700 hover:text-green-500">
                  <FiEdit />
                </button>
                <button className="btn btn-sm btn-outline text-red-700 hover:text-red-500">
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
