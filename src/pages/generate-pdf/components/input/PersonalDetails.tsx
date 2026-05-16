import { useDebouncedCallback } from "use-debounce";
import { ExpandableSectionContainer } from "./ExpandableSectionContainer";

import InputField from "./InputField";
import type { IPersonalDetail } from "../../interface/generatePdfInterface";

const PersonalDetail = ({
  personalDetail,
  setPersonalDetail,
  summaryMode = false,
}: {
  personalDetail: IPersonalDetail;
  setPersonalDetail: React.Dispatch<React.SetStateAction<IPersonalDetail>>;
  summaryMode?: boolean;
}) => {
  const handlePersonalDetailChange = useDebouncedCallback(
    (value: string, key: string) => {
      setPersonalDetail({ ...personalDetail, [key]: value });
    },
    500,
  );

  const fieldInputClass =
    "w-full rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

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
          inputClass={fieldInputClass}
        />
      ),
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
          inputClass={fieldInputClass}
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
          inputClass={fieldInputClass}
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
          inputClass={fieldInputClass}
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
          inputClass={fieldInputClass}
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
          inputClass={fieldInputClass}
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
          inputClass={fieldInputClass}
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
          inputClass={fieldInputClass}
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
          inputClass={fieldInputClass}
        />
      ),
      containerClass: "sm:col-span-2",
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
          inputClass={fieldInputClass}
        />
      ),
    },
  ];

  if (summaryMode) {
    return (
      <ExpandableSectionContainer
        title="Personal Information"
        description="Add your personal and contact details so employers can easily identify and reach you."
        summaryMode
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-4">
          {listPersonalDetail.map((list) => (
            <div key={list.id} className={list.containerClass}>
              {list.component}
            </div>
          ))}
        </div>
      </ExpandableSectionContainer>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-lg sm:px-6 lg:px-8 lg:py-6 h-full">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">
            Personal Information
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-5 text-slate-600 sm:text-base">
            Add your personal and contact details so employers can easily
            identify and reach you.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-4">
        {listPersonalDetail.map((list) => (
          <div key={list.id} className={list.containerClass}>
            {list.component}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PersonalDetail;
