import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import AtsDocument from "./AtsDocument";
import Preview from "../../Preview";
import { useDebouncedCallback } from "use-debounce";

const AtsTemplate = () => {
  const [user, setUser] = useState({
    name: "",
  });

  const debouncedName = useDebouncedCallback((value) => {
    setUser({ ...user, name: value });
  }, 500);

  return (
    <div className="h-full w-full flex">
      <div className="basis-1/2">
        <div>
          <label htmlFor="">Full Name: </label>
          <input
            type="text"
            className="border"
            onChange={(e) => debouncedName(e.target.value)}
          />
        </div>
        <div className="mt-[16px]">
          <button className="border px-[8px] py-[4px] rounded-[4px]">
            <PDFDownloadLink
              document={<AtsDocument user={user} />}
              fileName="ats-cv"
            >
              {({ loading }) => (loading ? "Loading Document" : "Download CV")}
            </PDFDownloadLink>
          </button>
        </div>
      </div>
      <div className="basis-1/2">
        <Preview
          heightClass="h-[841px]"
          widthClass="w-[595px]"
          docs={<AtsDocument user={user} />}
        />
      </div>
    </div>
  );
};

export default AtsTemplate;
