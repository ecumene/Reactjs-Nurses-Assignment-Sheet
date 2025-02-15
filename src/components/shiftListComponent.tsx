import { useNavigate } from "react-router-dom";

export const ShiftListComponent = () => {
  const navigate = useNavigate();

  function formatDate(dateString: string): string {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);

    return `${day} ${getMonthName(month)}, ${year}`;
  }

  function getMonthName(month: string): string {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Subtract 1 from the month because JavaScript Date months are zero-based
    const monthIndex = parseInt(month, 10) - 1;

    return months[monthIndex];
  }

  // Retrieve shift data array from localStorage
  const existingDataJSON = localStorage.getItem("startShiftDataArray");
  const existingData = existingDataJSON ? JSON.parse(existingDataJSON) : [];

  existingData.sort((a: any, b: any) => {
    const dateA = a.data.shiftDate;
    const dateB = b.data.shiftDate;
    return dateB - dateA;
  });

  console.log(existingData);

  function viewShift(shiftId: string) {
    console.log("View shift", shiftId);
    navigate(`/viewShift/${shiftId}`);
  }

  function editShift(shiftId: string) {
    console.log("edit Shift", shiftId);
    navigate(`/manageStaff/${shiftId}`);
  }

  function deleteShift(shiftId: string) {
    console.log("delete Shift", shiftId);
    const updatedShiftList = existingData.filter((items: any) => {
      return items.ShiftId !== shiftId;
    });

    localStorage.setItem(
      "startShiftDataArray",
      JSON.stringify(updatedShiftList)
    );
    window.location.reload();
  }

  if (existingData.length !== 0) {
    return (
      <div className="flex flex-col md:flex-col items-center max-w-sm sm:max-w-2xl">
        <div className="flex flex-col lg:flex-col text-sm ms:text-md md:flex-col items-center max-w- sm:max-w-2xl">
          {existingData.map((existingData: any) => (
            <div
              className="sm:my-4 mx-2 sm:p-4 my-4 py-4 flex flex-col sm:flex-row items-center bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 md:duration-500"
              key={existingData.ShiftId}
            >
              <div className="flex flex-row">
                <div className="p-2">{existingData.data.unitName}</div>
                <div className="p-2">
                  {formatDate(existingData.data.shiftDate)}
                </div>
                <div className="p-2">{existingData.data.shiftType}</div>
              </div>

              <div className="flex flex-row lg:flex-row items-center justify-evenly">
                {" "}
                <button
                  className="sm:mx-2 mx-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1 px-2  sm:py-2 sm:px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => viewShift(existingData.ShiftId)}
                >
                  View
                </button>
                <button
                  className="sm:mx-2 mx-1 bg-sky-600 hover:bg-sky-500 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => editShift(existingData.ShiftId)}
                >
                  Edit
                </button>
                <button
                  className="sm:mx-2 mx-1 bg-red-700 hover:bg-red-600 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => deleteShift(existingData.ShiftId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    console.log("no shifts entered yet");
  }
};

export default ShiftListComponent;
