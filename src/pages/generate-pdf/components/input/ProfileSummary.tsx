import type React from "react";
import { HiddenSectionWrapper } from "./HiddenSectionWrapper";
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

  return (
    <HiddenSectionWrapper
      containerTitle="Profile Summary"
      containerDescription="Mention the roles and things you did in the past."
      withAddMoreSection={false}
    >
      <TextArea
        defaultValue={profileSummary}
        onChange={(input) => handleEditProfileSummary(input)}
        label="Description"
      />
    </HiddenSectionWrapper>
  );
};

export default ProfileSummary;
