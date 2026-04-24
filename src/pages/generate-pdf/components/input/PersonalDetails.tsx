import { useDebouncedCallback } from "use-debounce";

import InputWrapper from "./InputWrapper";
import InputField from "./InputField";
import type { IPersonalDetail } from "../../interface/generatePdfInterface";

const PersonalDetail = ({
  personalDetail,
  setPersonalDetail,
}: {
  personalDetail: IPersonalDetail;
  setPersonalDetail: React.Dispatch<React.SetStateAction<IPersonalDetail>>;
}) => {
  const handlePersonalDetailChange = useDebouncedCallback(
    (value: string, key: string) => {
      setPersonalDetail({ ...personalDetail, [key]: value });
    },
    500,
  );

  const listPersonalDetail = [
    {
      id: "jobTarget",
      component: (
        <InputField
          defaultValue={personalDetail.jobTarget}
          onChange={(input: string) => {
            handlePersonalDetailChange(input, "jobTarget");
          }}
          label="Job Target"
          placeholder="The role you want"
        />
      ),
    },
    {
      id: "photo",
      component: <>wip</>,
    },
    {
      id: "firstName",
      component: (
        <InputField
          defaultValue={personalDetail.firstName}
          onChange={(input: string) => {
            handlePersonalDetailChange(input, "firstName");
          }}
          label="First Name"
        />
      ),
    },
    {
      id: "lastName",
      component: (
        <InputField
          defaultValue={personalDetail.lastName}
          onChange={(input: string) => {
            handlePersonalDetailChange(input, "lastName");
          }}
          label="Last Name"
        />
      ),
    },
    {
      id: "email",
      component: (
        <InputField
          defaultValue={personalDetail.email}
          onChange={(input: string) => {
            handlePersonalDetailChange(input, "email");
          }}
          label="Email"
        />
      ),
    },
    {
      id: "phone",
      component: (
        <InputField
          defaultValue={personalDetail.phone}
          onChange={(input: string) => {
            handlePersonalDetailChange(input, "phone");
          }}
          label="Phone"
        />
      ),
    },
    {
      id: "linkedinUrl",
      component: (
        <InputField
          defaultValue={personalDetail.linkedinUrl}
          onChange={(input: string) => {
            handlePersonalDetailChange(input, "linkedinUrl");
          }}
          label="Linkedin URL"
        />
      ),
    },
    {
      id: "postalCode",
      component: (
        <InputField
          defaultValue={personalDetail.postalCode}
          onChange={(input: string) => {
            handlePersonalDetailChange(input, "postalCode");
          }}
          label="Postal Code"
        />
      ),
    },
    {
      id: "cityState",
      component: (
        <InputField
          defaultValue={personalDetail.cityState}
          onChange={(input: string) => {
            handlePersonalDetailChange(input, "cityState");
          }}
          label="City, State"
        />
      ),
    },
    {
      id: "country",
      component: (
        <InputField
          defaultValue={personalDetail.country}
          onChange={(input: string) => {
            handlePersonalDetailChange(input, "country");
          }}
          label="Country"
        />
      ),
    },
    {
      id: "address",
      component: (
        <InputField
          defaultValue={personalDetail.address}
          onChange={(input: string) => {
            handlePersonalDetailChange(input, "address");
          }}
          label="Address"
        />
      ),
      containerClass: "col-span-2",
    },
  ];

  return (
    <InputWrapper
      title="Personal Detail"
      useGrid
      childrenContainerClass="mt-[16px]"
      containerClass="p-[16px]"
    >
      {listPersonalDetail.map((list) => (
        <div key={list.id} className={list.containerClass}>
          {list.component}
        </div>
      ))}
    </InputWrapper>
  );
};

export default PersonalDetail;
