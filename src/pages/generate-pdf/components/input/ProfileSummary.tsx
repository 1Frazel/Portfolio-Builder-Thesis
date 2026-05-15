import type React from "react";
import { ExpandableSectionContainer } from "./ExpandableSectionContainer";
import TextArea from "./TextArea";
import { useDebouncedCallback } from "use-debounce";

const ProfileSummary = ({
  profileSummary,
  setProfileSummary,
}: {
  profileSummary: string;
  setProfileSummary: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleEditProfileSummary = useDebouncedCallback((input) => {
    setProfileSummary(input);
  }, 500);

  const fieldInputClass =
    "w-full rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

  return (
    <ExpandableSectionContainer
      title="Profile Summary"
      description="Write a concise, compelling overview of your professional identity. Highlight your core expertise, key accomplishments, and immediate career objectives in three to four sentences."
    >
      <TextArea
        defaultValue={profileSummary}
        onChange={(input) => handleEditProfileSummary(input)}
        label="Description"
        inputClass={fieldInputClass}
      />
    </ExpandableSectionContainer>
  );
};

export default ProfileSummary;
