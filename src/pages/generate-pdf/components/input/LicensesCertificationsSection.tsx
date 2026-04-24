import { useDebouncedCallback } from "use-debounce";
import InputField from "./InputField";
import type { ILicensesCertifications } from "../../interface/generatePdfInterface";
import DateInput from "./DateInput";
import { HiddenSection } from "./HiddenSectionWrapper";
import InputWrapper from "./InputWrapper";

const LicensesCertificationsSection = ({
  license,
  handleEditLicensesCertifications,
  handleDeleteLicensesCertifications,
}: {
  license: ILicensesCertifications;
  handleEditLicensesCertifications: (
    id: number,
    key: string,
    value: string,
  ) => void;
  handleDeleteLicensesCertifications: (id: number) => void;
}) => {
  const handleTextChange = useDebouncedCallback(
    (id: number, key: string, value: string) => {
      handleEditLicensesCertifications(id, key, value);
    },
    500,
  );

  const listLicensesCertificationsSection = [
    {
      id: "name",
      component: (
        <InputField
          defaultValue={license.name}
          onChange={(input: string) => {
            handleTextChange(license.id, "name", input);
          }}
          label="Certification Name"
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
          label="Issuer"
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
          label="Start & End Date"
          placeholder="MM // YYYY"
        />
      ),
    },
  ];
  return (
    <HiddenSection
      headerTitle={license.name ? license.name : "(Not Specified)"}
      headerDescription={
        license.startAt &&
        `${license.startAt} - ${license.endsAt ? license.endsAt : "Now"}`
      }
      handleDelBtn={() => handleDeleteLicensesCertifications(license.id)}
    >
      <InputWrapper useGrid>
        {listLicensesCertificationsSection.map((list) => {
          return <div key={list.id}>{list.component}</div>;
        })}
      </InputWrapper>
    </HiddenSection>
  );
};

export default LicensesCertificationsSection;
