import type React from "react";

// layout handled locally to make it responsive (1 column mobile, 2 columns desktop)
import { ExpandableSectionContainer } from "./ExpandableSectionContainer";
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
  const handleEnableSections = (id: string) => {
    setAdditionalSections(
      additionalSections.map((section) => {
        if (section.id === id) {
          // only set to true if currently false; do not toggle off
          return { ...section, isSet: section.isSet ? section.isSet : true };
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
        <ExpandableSectionContainer
          title="Additional Sections"
          description="Include supplementary information that adds value to your candidacy, such as professional certifications and Trainings, or foreign language proficiencies."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {listAdditionalSections.map((list) => (
              <IndividualSections
                key={list.id}
                list={list}
                additionalSections={additionalSections}
                handleClick={handleEnableSections}
                setActiveAdditionalSection={setActiveAdditionalSection}
              />
            ))}
          </div>
        </ExpandableSectionContainer>
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
  handleClick: (id: string) => void;
  setActiveAdditionalSection: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const isChecked =
    additionalSections.find((section) => section.id === list.id)?.isSet ??
    false;

  return (
    <button
      type="button"
      onClick={() => {
        // Only set isSet true on first click; subsequent clicks keep it as-is.
        handleClick(list.id);
        setActiveAdditionalSection(list.id);
      }}
      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-slate-50"
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full border ${
          isChecked
            ? "border-blue-600 bg-white text-blue-600"
            : "border-slate-300 bg-white text-slate-400"
        }`}
        aria-hidden
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className={`${isChecked ? "text-blue-600" : "text-slate-700"}`}>
        {list.title}
      </span>
    </button>
  );
};

export default AdditionalSections;
