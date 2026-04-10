import type { DebouncedState } from "use-debounce";
import DataInput from "./DataInput";
import type { IPersonalDetail } from "./personalDetail";

const PersonalDetail = ({
  listInput,
  onChange,
}: {
  listInput: IPersonalDetail[];
  onChange: DebouncedState<(value: string, key: string) => void>;
}) => {
  return (
    <div className="p-[16px]">
      <div className="flex justify-between items-center">
        <h1 className="font-bold">Personal Information</h1>
      </div>
      <div className="grid grid-cols-2 gap-[16px] mt-[16px]">
        {listInput.map((input) => {
          return (
            <DataInput
              key={input.id}
              label={input.label}
              onChange={onChange}
              stateKey={input.id}
              type={input.inputType}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PersonalDetail;
