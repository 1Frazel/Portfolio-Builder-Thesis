import type React from "react";
import { useTranslation } from "react-i18next";
import { ExpandableSectionContainer } from "./ExpandableSectionContainer";
import TextArea from "./TextArea";
import { useDebouncedCallback } from "use-debounce";

const ProfileSummary = ({
  profileSummary,
  setProfileSummary,
  summaryMode = false,
}: {
  profileSummary: string;
  setProfileSummary: React.Dispatch<React.SetStateAction<string>>;
  summaryMode?: boolean;
}) => {
  const { t } = useTranslation("creationPage");

  const handleEditProfileSummary = useDebouncedCallback((input) => {
    setProfileSummary(input);
  }, 500);

  const fieldInputClass =
    "w-full rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

  return (
    <ExpandableSectionContainer
      title={t("profileSummary.title")}
      description={t("profileSummary.description")}
      summaryMode={summaryMode}
    >
      <TextArea
        defaultValue={profileSummary}
        onChange={(input) => handleEditProfileSummary(input)}
        label={t("profileSummary.labels.description")}
        inputClass={fieldInputClass}
      />
    </ExpandableSectionContainer>
  );
};

export default ProfileSummary;
