import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import IdentityInfo from "./FormComponents/Identity/IdentityInfo";
import Education from "./FormComponents/Education/Education";
import License from "./FormComponents/License/License";
import AutoFillPopup from "../ui/AutofillPopup/autoFillPopup";
import Expertise from "./FormComponents/Expertise/Expertise";

export default function MainFormComponent() {
  const [activeButton, setActiveButton] = useState("my-information");

  const handleButtonClick = (path: string) => {
    setActiveButton(path);
  };

  return (
    <>
      <div className="relative flex-grow top-4 left-4 bottom-4 bg-white p-4 rounded-xl shadow-md border w-64  ml-4 sm:ml-8 md:ml-64 lg:ml-64 xl:ml-64 sm:ml-0 md:ml-0">
      <AutoFillPopup></AutoFillPopup>
        <div className="font-bold mt-5 text-black text-center ">
          <h3>Your account has been created </h3>
          <p className="text-lg mt-6">Fill the details in 4-easy steps!</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center mt-12">
          <div className="flex items-center w-full sm:w-1/2">
            <button
              onClick={() => handleButtonClick("my-information")}
              className={`rounded-full py-1 px-4 flex items-center justify-center border text-black font-bold w-40 ${
                activeButton === "my-information"
                  ? "bg-[#349997] text-white"
                  : "hover:bg-[#349997] hover:text-white"
              }`}
            >
              Identity Info
            </button>
            <div className="flex-1 h-1 bg-[#C5C5C5] w-1 "></div>
            <button
              onClick={() => handleButtonClick("education")}
              className={`rounded-full py-2 px-4 flex items-center justify-center border text-black font-bold w-34 text-sm ${
                activeButton === "education"
                  ? "bg-[#349997] text-white"
                  : "hover:bg-[#349997] hover:text-white"
              }`}
            >
              Education
            </button>
            <div className="flex-1 h-1 bg-[#C5C5C5] w-1 "></div>
            <button
              onClick={() => handleButtonClick("expertise")}
              className={`rounded-full py-2 px-4 flex items-center justify-center border text-black font-bold w-34 text-sm ${
                activeButton === "expertise"
                  ? "bg-[#349997] text-white"
                  : "hover:bg-[#349997] hover:text-white"
              }`}
            >
              Expertise
            </button>
            <div className="flex-1 h-1 bg-[#C5C5C5] w-1 "></div>
            <button
              onClick={() => handleButtonClick("license")}
              className={`rounded-full py-2 px-4 flex items-center justify-center border text-black font-bold w-34 text-sm ${
                activeButton === "license"
                  ? "bg-[#349997] text-white"
                  : "hover:bg-[#349997] hover:text-white"
              }`}
            >
              License
            </button>
          </div>

          <div className="ml-auto flex items-center space-x-4 mt-4 sm:mt-0">
            <div className="text-blue-500">
              <Link href="/">
                <p
                  className="underline underline-offset-4"
                  style={{ color: "black" }}
                >
                  View Profile
                </p>
              </Link>
            </div>
            <Button type="submit">Save Changes</Button>
          </div>
        </div>
        {(() => {
          switch (activeButton) {
            case "my-information":
              return <IdentityInfo />;

            case "expertise":
              return <Expertise/>;

            case "education":
              return <Education />;

            case "license":
              return <License />;
            default:
              return null; // or some default component if needed
          }
        })()}
      </div>
    </>
  );
}
