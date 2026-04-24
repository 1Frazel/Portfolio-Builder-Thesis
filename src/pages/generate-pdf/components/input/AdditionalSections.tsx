import type React from "react";

import { HiddenSectionWrapper } from "./HiddenSectionWrapper";
import InputWrapper from "./InputWrapper";
import type {
  IAdditionalSections,
  IListSections,
} from "../../interface/generatePdfInterface";

const AdditionalSections = ({
  additionalSections,
  setAdditionalSections,
  listAdditionalSections,
  activeAdditionalSection,
  setActiveAdditionalSection,
}: {
  additionalSections: IAdditionalSections[];
  setAdditionalSections: React.Dispatch<
    React.SetStateAction<IAdditionalSections[]>
  >;
  listAdditionalSections: IListSections[];
  activeAdditionalSection: string;
  setActiveAdditionalSection: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleEnableSections = (id: string, isSet: boolean) => {
    setAdditionalSections(
      additionalSections.map((section) => {
        if (section.id === id) {
          return { ...section, isSet };
        }
        return section;
      }),
    );
  };

  const currentActiveSections = listAdditionalSections.find(
    (section) => section.id === activeAdditionalSection,
  );

  const currentActiveSectionsComponents = currentActiveSections ? (
    currentActiveSections.component
  ) : (
    <p>Can't find the current section!...</p>
  );

  return (
    <>
      {activeAdditionalSection === "default" ? (
        <HiddenSectionWrapper containerTitle="Additional Sections">
          <InputWrapper useGrid>
            {listAdditionalSections.map((list) => {
              return (
                <IndividualSections
                  key={list.id}
                  list={list}
                  additionalSections={additionalSections}
                  handleClick={handleEnableSections}
                  setActiveAdditionalSection={setActiveAdditionalSection}
                />
              );
            })}
          </InputWrapper>
        </HiddenSectionWrapper>
      ) : (
        currentActiveSectionsComponents
      )}
    </>
  );
};

const IndividualSections = ({
  list,
  additionalSections,
  handleClick,
  setActiveAdditionalSection,
}: {
  list: IListSections;
  additionalSections: IAdditionalSections[];
  handleClick: (id: string, isSet: boolean) => void;
  setActiveAdditionalSection: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const isChecked =
    additionalSections.find((section) => section.id === list.id)?.isSet ??
    false;

  return (
    <div className="flex items-center gap-[16px]">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => {
          handleClick(list.id, e.target.checked);
          if (e.target.checked) {
            setActiveAdditionalSection(list.id);
          }
        }}
      />
      <p>{list.title}</p>
    </div>
  );
};

export default AdditionalSections;
