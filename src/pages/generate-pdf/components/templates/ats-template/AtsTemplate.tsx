import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import AtsDocument from "./AtsDocument";

import { useDebouncedCallback } from "use-debounce";
import Preview from "../../preview/Preview";
import {
  defaultPersonalDetail,
  personalDetail,
} from "../../input/personalDetail";
import PersonalDetail from "../../input/PersonalDetails";

export interface IAtsTemplateUser {
  address: string;
  country: string;
  email: string;
  firstName: string;
  jobTarget: string;
  lastName: string;
  linkedinUrl: string;
  phone: string;
  photo: string;
  postalCode: string;
}

const AtsTemplate = () => {
  const [user, setUser] = useState({ ...defaultPersonalDetail });
  console.log({ user });

  const handleChange = useDebouncedCallback((value: string, key: string) => {
    setUser({ ...user, [key]: value });
  }, 500);

  return (
    <div className="h-full w-full flex">
      <div className="w-[50%]">
        <PersonalDetail listInput={personalDetail} onChange={handleChange} />
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
      <div className="w-[50%]">
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
