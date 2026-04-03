import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import AtsDocument from "./AtsDocument";
import Preview from "../../Preview";

const AtsTemplate = () => {
  const [user, setUser] = useState({
    name: "",
  });

  return (
    <div className="h-full w-full flex">
      <div className="basis-1/2">
        <div>
          <label htmlFor="">Full Name: </label>
          <input
            type="text"
            value={user.name}
            className="border"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div className="mt-[16px]">
          <button className="border px-[8px] py-[4px] rounded-[4px]">
            <PDFDownloadLink
              document={<AtsDocument user={user} />}
              fileName={`${user.name}-cv`}
            >
              {({ loading }) => (loading ? "Loading Document" : "Download CV")}
            </PDFDownloadLink>
          </button>
        </div>
      </div>
      <div className="basis-1/2">
        <Preview docs={<AtsDocument user={user} />} />
      </div>
    </div>
  );
};

export default AtsTemplate;
