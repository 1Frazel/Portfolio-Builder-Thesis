import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("creationPage");
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
          label={t("personalInfo.labels.jobTitle")}
          placeholder={t("personalInfo.labels.placeholder")}
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
          label={t("personalInfo.labels.firstName")}
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
          label={t("personalInfo.labels.lastName")}
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
          label={t("personalInfo.labels.email", "Email")}
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
          label={t("personalInfo.labels.phone")}
          inputClass={fieldInputClass}
          sanitizeValue={(input: string) => input.replace(/\D/g, "")}
          inputMode="numeric"
          pattern="[0-9]*"
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
          label={t("personalInfo.labels.linkedin")}
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
          label={t("personalInfo.labels.postal")}
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
          label={t("personalInfo.labels.cityState")}
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
          label={t("personalInfo.labels.address")}
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
          label={t("personalInfo.labels.country")}
          inputClass={fieldInputClass}
        />
      ),
    },
  ];

  if (summaryMode) {
    return (
      <ExpandableSectionContainer
        title={t("personalInfo.title")}
        description={t("personalInfo.description")}
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
          <h1 className="text-[28px] font-semibold text-slate-900">
            {t("personalInfo.title")}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-5 text-slate-600 sm:text-base">
            {t("personalInfo.description")}
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
