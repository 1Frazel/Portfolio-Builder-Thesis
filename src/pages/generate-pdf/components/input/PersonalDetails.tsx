import type { DebouncedState } from "use-debounce";

import type { IListInput } from "./personalDetail";
import InputWrapper from "./InputWrapper";
import InputField from "./InputField";

const PersonalDetail = ({
  listInput,
  onChange,
}: {
  listInput: IListInput[];
  onChange: DebouncedState<(value: string, key: string) => void>;
}) => {
  return (
    <InputWrapper title="Personal Detail">
      {listInput.map((input) => {
        return (
          <InputField
            key={input.id}
            onChange={onChange}
            stateKey={input.id}
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
