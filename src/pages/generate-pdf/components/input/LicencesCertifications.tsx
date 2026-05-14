import type React from "react";
import type { ILicensesCertifications } from "../../interface/generatePdfInterface";

import LicensesCertificationsSection from "./LicensesCertificationsSection";
import { DEFAULT_LICENSES_CERTIFICATION } from "../../const/generatePdfConst";
import { ExpandableSectionContainer } from "./ExpandableSectionContainer";

const LicensesCertifications = ({
  licensesCertifications,
  setLicensesCertifications,
}: {
  licensesCertifications: ILicensesCertifications[];
  setLicensesCertifications: React.Dispatch<
    React.SetStateAction<ILicensesCertifications[]>
  >;
}) => {
  const handleEditLicensesCertifications = (
    id: number,
    key: string,
    value: string,
  ) => {
    setLicensesCertifications(
      licensesCertifications.map((license) => {
        if (license.id === id) {
          return {
            ...license,
            [key]: value,
          };
        }
        return license;
      }),
    );
  };

  const handleAddLicensesCertifications = () => {
    const latestId =
      licensesCertifications[licensesCertifications.length - 1].id;
    setLicensesCertifications([
      ...licensesCertifications,
      {
        ...DEFAULT_LICENSES_CERTIFICATION,
        id: latestId + 1,
      },
    ]);
  };

  const handleDeleteLicensesCertifications = (id: number) => {
    setLicensesCertifications(
      licensesCertifications.filter((license) => license.id !== id),
    );
  };

  const handleSectionUp = (currentIndex: number) => {
    const currentLicensesCertifications = [...licensesCertifications];

    const temporary = currentLicensesCertifications[currentIndex];
    currentLicensesCertifications[currentIndex] =
      currentLicensesCertifications[currentIndex - 1];
    currentLicensesCertifications[currentIndex - 1] = temporary;

    setLicensesCertifications(currentLicensesCertifications);
  };

  const handleSectionDown = (currentIndex: number) => {
    const currentLicensesCertifications = [...licensesCertifications];

    const temporary = currentLicensesCertifications[currentIndex];
    currentLicensesCertifications[currentIndex] =
      currentLicensesCertifications[currentIndex + 1];
    currentLicensesCertifications[currentIndex + 1] = temporary;

    setLicensesCertifications(currentLicensesCertifications);
  };

  return (
    <ExpandableSectionContainer
      title="Licenses / Certifications"
      addButtonTitle="Add another license / certification"
      onAdd={handleAddLicensesCertifications}
    >
      {licensesCertifications.map((license, index) => {
        return (
          <LicensesCertificationsSection
            key={license.id}
            license={license}
            index={index}
            isFirst={index === 0}
            isLast={index === licensesCertifications.length - 1}
            handleEditLicensesCertifications={handleEditLicensesCertifications}
            handleDeleteLicensesCertifications={
              handleDeleteLicensesCertifications
            }
            handleSectionUp={handleSectionUp}
            handleSectionDown={handleSectionDown}
          />
        );
      })}
    </ExpandableSectionContainer>
  );
};

export default LicensesCertifications;
