import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useState} from "react"

interface IPatientData {
  patientName: string;
  patientRoom: string;
}

export function NurseCardDisplay({ staffData }: { staffData: any }) {
  const { ShiftId } = useParams();
  const navigate = useNavigate();
  const existingDataJSON = localStorage.getItem("startShiftDataArray");
  const existingData = existingDataJSON ? JSON.parse(existingDataJSON) : [];

  console.log("existing Data", existingData);

  // Find the shift data object with the matching shiftId
  const matchingData = existingData.find(
    (data: any) => data.ShiftId === ShiftId
  );

  console.log("matching Data:", matchingData);

  const [nurses , setNurses] = useState(staffData);

  console.log(staffData);

  const deleteNurse = (ShiftId: any, nurseId: string) => {

    // Retrieve shift data array from localStorage
    const existingDataJSON = localStorage.getItem("startShiftDataArray");
    const existingData = existingDataJSON ? JSON.parse(existingDataJSON) : [];

    console.log("existing Data", existingData);

    // Find the shift data object with the matching shiftId
    const matchingData = existingData.find(
      (data: any) => data.ShiftId === ShiftId
    );

    console.log("matching Data:", matchingData);

    const exsitingNurseArray = matchingData.staff;
    // get the index of the nurse card

    const updatedNurseList = exsitingNurseArray.filter((item: any) => {
      return item.nurseId !== nurseId;
    });

    matchingData.staff = updatedNurseList;

    console.log("Updated Nurse List", updatedNurseList);
    //  update the local storage
    localStorage.setItem("startShiftDataArray", JSON.stringify(existingData));

    setNurses(updatedNurseList);
    staffData = updatedNurseList;
    console.log(updatedNurseList);

    
  };

  const editNurse = (ShiftId: any, nurseId: string) => {
    navigate(`/editNurse/${ShiftId}/${nurseId}`);

    // 2- have the form autopopulated with the nurse info using nurseId
    // 3- on form submission is handled through the onSubmitEdit function that is in the editNurse page.
    // 4- have to find a way to send the  ShiftId to the editNurse page to be passed in as a prop there.
  };
  console.log(staffData);
  if (ShiftId && staffData.length !== 0) {
    
    return (

      <div className="flex flex-row flex-wrap justify-evenly">
        {nurses.map((staffData: any, nurseIndex: number) => (
          <div className="bg-white shadow-lg rounded-lg sm:px-8 sm:pt-6 sm:pb-8 my-4  max-w-sm mx-2 text-sm">
            <div key={nurseIndex} className="flex flex-col m-4">
              <div className="flex flex-col justify-center items-center text-center font-bold">
                {staffData.nurseData.nurseName}
              </div>
              <table className="table-auto">
                <tbody>
                  <tr>
                    <td className="font-semibold text-cyan-700">Break:</td>
                    <td>{staffData.nurseData.nurseBreak}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-cyan-700">Relief:</td>
                    <td>{staffData.nurseData.reliefName}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-cyan-700">
                      Extra Duties:
                    </td>
                    <td>{staffData.nurseData.extraDuties}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-cyan-700">Fire Code:</td>
                    <td className="text-red-500">
                      {staffData.nurseData.fireCode}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div>
                <table className="mb-4">
                  <thead>
                    <tr className="border border-stone-700 bg-stone-400 text-white">
                      <th className="border border-stone-700 px-2 py-1">
                        Room
                      </th>
                      <th className="border border-stone-700 px-2 py-1">
                        Patient
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffData.nurseData.assignedPatient.map(
                      (patient: IPatientData, patientIndex: number) => (
                        <tr key={patientIndex}>
                          <td className="border px-2 py-1">
                            {patient.patientRoom}
                          </td>
                          <td className="border px-2 py-1">
                            {patient.patientName}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-row justify-evenly items-center">
                <button
                  className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => editNurse(ShiftId, staffData.nurseId)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => deleteNurse(ShiftId, staffData.nurseId)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    
 ) } else {
    console.log("no nurses added to this shift yet");
  }
}

export default NurseCardDisplay;
