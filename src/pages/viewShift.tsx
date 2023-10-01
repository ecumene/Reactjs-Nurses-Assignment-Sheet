import { useParams } from "react-router-dom";
import ViewNurseCard from "../components/viewNursesComponent";



function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function retriveShiftDataLSwithShiftId(ShiftId: string): any {
  // Retrieve shift data array from localStorage
  const existingDataJSON = localStorage.getItem("startShiftDataArray");
  const existingData = existingDataJSON ? JSON.parse(existingDataJSON) : [];

  console.log("existing Data", existingData);

  // Find the shift data object with the matching shiftId
  const matchingData = existingData.find(
    (data: any) => data.ShiftId === ShiftId
  );

  console.log("matching Data:", matchingData);

  return matchingData ? matchingData.data : null;
}

export function ViewShift() {
  const { ShiftId } = useParams();


  if (ShiftId) {
    // Check if ShiftId is defined
    const shiftData = retriveShiftDataLSwithShiftId(ShiftId);

    console.log("shiftData", shiftData);

    console.log(shiftData);
    if (ShiftId) {
      const existingDataJSON = localStorage.getItem("startShiftDataArray");
      const existingData = existingDataJSON ? JSON.parse(existingDataJSON) : [];
      const matchingData = existingData.find(
        (data: any) => data.ShiftId === ShiftId
      );

      const staffData = matchingData.staff ?? [];

      console.log("staffData", staffData);

      return (
        <div className="font-nunito bg-greygreen sm:max-w-full">
          <div className="flex flex-col items-center justify-center">
            <div className="text-nunito-900 font-extrabold text-md sm:text-xl lg:text-3xl tracking-tight text-center p-2 bg-white shadow-lg rounded-lg sm:px-8 sm:pt-6 sm:pb-8 sm:py-4 m-8 text-green">
              <p>{shiftData.unitName}</p>
              <div className="flex sm:flex-row items-center flex-col">
                {" "}
                <p className="px-4">{formatDate(shiftData?.shiftDate)}</p>
                <p className="px-4">{shiftData.shiftType}</p>
              </div>
            </div>
          </div>

          <div>
            {" "}
            <ViewNurseCard staffData={staffData} />{" "}
          </div>
        </div>
      );
    } else {
      console.log("ShiftId is undefined.");
    }
  } else {
    console.log("ShiftId is undefined.");
  }
}

export default ViewShift;
