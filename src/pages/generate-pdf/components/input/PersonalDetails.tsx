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
  return (
    <InputWrapper
      title="Personal Detail"
      useGrid
      childrenContainerClass="mt-[16px]"
      containerClass="p-[16px]"
    >
      {listInput.map((input) => {
        return (
          <PersonalDetailBody
            key={input.id}
            input={input}
            personalDetail={personalDetail}
            setPersonalDetail={setPersonalDetail}
          />
        );
      })}
    </InputWrapper>
  );
};

const PersonalDetailBody = ({
  input,
  personalDetail,
  setPersonalDetail,
}: {
  input: IListInput;
  personalDetail: IPersonalDetail;
  setPersonalDetail: React.Dispatch<React.SetStateAction<IPersonalDetail>>;
}) => {
  const handlePersonalDetailChange = useDebouncedCallback(
    (value: string, key: string) => {
      setPersonalDetail({ ...personalDetail, [key]: value });
    },
    500,
  );

  const handleChange = (value: string) => {
    handlePersonalDetailChange(value, input.id);
  };

  return (
    <InputField
      onChange={handleChange}
      label={input.label}
      type={input.inputType}
      placeholder={input.placeholder}
      containerClass={input.containerClass}
      labelClass={input.labelClass}
      inputClass={input.inputClass}
    />
  );
};

export default PersonalDetail;
