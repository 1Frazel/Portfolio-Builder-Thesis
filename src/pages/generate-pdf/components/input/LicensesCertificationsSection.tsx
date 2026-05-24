import { useDebouncedCallback } from "use-debounce";
import { useTranslation } from "react-i18next";
import InputField from "./InputField";
import type { ILicensesCertifications } from "../../interface/generatePdfInterface";
import DateInput from "./DateInput";
import { ExpandableSectionItem } from "./ExpandableSectionContainer";

const LicensesCertificationsSection = ({
  license,
  index,
  isFirst,
  isLast,
  handleEditLicensesCertifications,
  handleDeleteLicensesCertifications,
  handleSectionUp,
  handleSectionDown,
}: {
  license: ILicensesCertifications;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  handleEditLicensesCertifications: (
    id: number,
    key: string,
    value: string,
  ) => void;
  handleDeleteLicensesCertifications: (id: number) => void;
  handleSectionUp: (currentIndex: number) => void;
  handleSectionDown: (currentIndex: number) => void;
}) => {
  const { t } = useTranslation("creationPage");

  const handleTextChange = useDebouncedCallback(
    (id: number, key: string, value: string) => {
      handleEditLicensesCertifications(id, key, value);
    },
    500,
  );

  const fieldInputClass =
    "w-full rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

  const listLicensesCertificationsSection = [
    {
      id: "name",
      component: (
        <InputField
          defaultValue={license.name}
          onChange={(input: string) => {
            handleTextChange(license.id, "name", input);
          }}
          label={t("additionalSectionLicensesCertifications.labels.certificationName")}
          inputClass={fieldInputClass}
        />
      ),
    },
    {
      id: "issuer",
      component: (
        <InputField
          defaultValue={license.issuer}
          onChange={(input: string) => {
            handleTextChange(license.id, "issuer", input);
          }}
          label={t("additionalSectionLicensesCertifications.labels.issuer", "Issuer")}
          inputClass={fieldInputClass}
        />
      ),
    },
    {
      id: "startAndEndDate",
      component: (
        <DateInput
          startDefaultValue={license.startAt}
          endDefaultValue={license.endsAt}
          startOnChange={(value: string) => {
            handleTextChange(license.id, "startAt", value);
          }}
          endOnChange={(value: string) => {
            handleTextChange(license.id, "endsAt", value);
          }}
          label={t("additionalSectionLicensesCertifications.labels.startEndDate", "Start & End Date")}
          placeholder={t("additionalSectionLicensesCertifications.labels.placeholder", "MM / YYYY")}
          inputClass={fieldInputClass}
        />
      ),
    },
  ];
  return (
    <ExpandableSectionItem
      title={license.name ? license.name : t("additionalSectionLicensesCertifications.default", "(Not Specified)")}
      description={
        license.startAt &&
        `${license.startAt} - ${license.endsAt ? license.endsAt : "Now"}`
      }
      onDelete={() => handleDeleteLicensesCertifications(license.id)}
      onMoveUp={handleSectionUp}
      onMoveDown={handleSectionDown}
      index={index}
      isFirst={isFirst}
      isLast={isLast}
      defaultExpanded={index === 0}
    >
      <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
        {listLicensesCertificationsSection.map((list) => {
          return <div key={list.id}>{list.component}</div>;
        })}
      </div>
    </ExpandableSectionItem>
  );
};

export default LicensesCertificationsSection;
