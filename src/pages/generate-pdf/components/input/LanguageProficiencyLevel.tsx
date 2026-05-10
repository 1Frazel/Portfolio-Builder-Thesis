import Dropdown from "../../../../shared/components/Dropdown";
import { DropdownContextProvider } from "../../../../shared/hooks/DropdownContext";
import InputFieldWrapper from "./InputFieldWrapper";

const LanguageProficiencyLevel = ({
  selectedSkill,
  handleClick,
}: {
  selectedSkill: string;
  handleClick: (input: string) => void;
}) => {
  const proficiencyList = ["Native", "Proficient", "Basic"];

  return (
    <InputFieldWrapper label="Level">
      <DropdownContextProvider>
        <Dropdown>
          <Dropdown.Trigger>
            {selectedSkill ? selectedSkill : "Select Level"}
          </Dropdown.Trigger>
          <Dropdown.MenuItem>
            {proficiencyList.map((list) => {
              return (
                <Dropdown.MenuItems
                  key={list}
                  handleClick={() => handleClick(list)}
                >
                  {list}
                </Dropdown.MenuItems>
              );
            })}
          </Dropdown.MenuItem>
        </Dropdown>
      </DropdownContextProvider>
    </InputFieldWrapper>
  );
};

export default LanguageProficiencyLevel;
