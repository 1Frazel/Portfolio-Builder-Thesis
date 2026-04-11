import { useDebouncedCallback } from "use-debounce";

import type { IListInput, IPersonalDetail } from "./personalDetail";
import InputWrapper from "./InputWrapper";
import InputField from "./InputField";

const PersonalDetail = ({
  listInput,
  personalDetail,
  setPersonalDetail,
}: {
  listInput: IListInput[];
  personalDetail: IPersonalDetail;
  setPersonalDetail: React.Dispatch<React.SetStateAction<IPersonalDetail>>;
}) => {
  const handlePersonalDetailChange = useDebouncedCallback(
    (value: string, key: string) => {
      setPersonalDetail({ ...personalDetail, [key]: value });
    },
    500,
  );

  console.log(listInput);
  return (
    <InputWrapper title="Personal Detail" useGrid>
      {listInput.map((input) => {
        const handleChange = (value: string) => {
          handlePersonalDetailChange(value, input.id);
        };

        return (
          <InputField
            key={input.id}
            onChange={handleChange}
            label={input.label}
            type={input.inputType}
            placeholder={input.placeholder}
            containerClass={input.containerClass}
            labelClass={input.labelClass}
            inputClass={input.inputClass}
          />
        );
      })}
    </InputWrapper>
  );
};

export default PersonalDetail;
