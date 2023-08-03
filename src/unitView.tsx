export function UnitView ()
{
    return (
      <div className="font-nunito">
        <div className="flex flex-col items-center justify-center mb-10">
          <h1 className="text-nunito-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center m-4">
            Welcome to Cardiology Unit
          </h1>
          <h2 className="text-nunito-900 font-extrabold text-xl sm:text-2xl lg:text-lg tracking-tight text-center m-10">
            Please select from the options below
          </h2>
        </div>
        <div className="flex flex-row flex-wrap justify-evenly mt-10 mb-40">
          <div className="flex flex-col">
            <a href="/createSheet">
              <img
                className="w-40 rounded-lg "
                src="images/create-logo.png"
                alt=""
              />
              <p className="text-lg rounded-lg p-2 bg-lgreen text-white font-bold mt-2">
                Create A New Shift
              </p>
            </a>
          </div>
          <div>
            <a href="/shiftHistory" className="flex flex-col">
              <img
                className="w-40 rounded-lg "
                src="images/history-logo.png"
                alt=""
              />
              <p className="text-lg rounded-lg p-2 bg-lgreen text-white font-bold mt-2">
                View Shift History
              </p>
            </a>
          </div>
        </div>
      </div>
    );
}