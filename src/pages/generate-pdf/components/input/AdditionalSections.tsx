import type { IListSections } from "../templates/ats-template/AtsTemplate";
import type { IAdditionalSections } from "./additionalSections";
import { HiddenSectionWrapper } from "./HiddenSectionWrapper";
import InputWrapper from "./InputWrapper";

const AdditionalSections = ({
  additionalSections,
  setAdditionalSections,
  listAdditionalSections,
}: {
  additionalSections: IAdditionalSections[];
  setAdditionalSections: React.Dispatch<
    React.SetStateAction<IAdditionalSections[]>
  >;
  listAdditionalSections: IListSections[];
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

  return (
    <HiddenSectionWrapper containerTitle="Additional Sections">
      <InputWrapper useGrid>
        {listAdditionalSections.map((list) => {
          return (
            <IndividualSections
              key={list.id}
              list={list}
              additionalSections={additionalSections}
              handleClick={handleEnableSections}
            />
          );
        })}
      </InputWrapper>
    </HiddenSectionWrapper>
  );
};

const IndividualSections = ({
  list,
  additionalSections,
  handleClick,
}: {
  list: IListSections;
  additionalSections: IAdditionalSections[];
  handleClick: (id: string, isSet: boolean) => void;
}) => {
  const isChecked =
    additionalSections.find((section) => section.id === list.id)?.isSet ??
    false;

  return (
    <div className="flex items-center gap-[16px]">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => handleClick(list.id, e.target.checked)}
      />
      <p>{list.title}</p>
    </div>
  );
};

export default AdditionalSections;
