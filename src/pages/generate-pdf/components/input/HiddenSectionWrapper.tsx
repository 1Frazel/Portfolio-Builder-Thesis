import React, { useState } from "react";
import InputWrapper from "./InputWrapper";

const HiddenSectionWrapper = ({
  children,
  containerTitle,
  containerDescription,
  childrenContainerClass = "flex flex-col gap-[16px] relative",
  addMoreSectionTitle,
  withAddMoreSection = true,
  handleAddMoreSection,
}: {
  children: React.ReactNode;
  containerTitle: string;
  containerDescription?: string;
  childrenContainerClass?: string;
  addMoreSectionTitle?: string;
  withAddMoreSection?: boolean;
  handleAddMoreSection?: () => void;
}) => {
  return (
    <InputWrapper
      title={containerTitle}
      description={containerDescription}
      childrenContainerClass={childrenContainerClass}
    >
      {children}
      {withAddMoreSection && addMoreSectionTitle && handleAddMoreSection && (
        <button onClick={handleAddMoreSection}>{addMoreSectionTitle}</button>
      )}
    </InputWrapper>
  );
};

const HiddenSection = ({
  children,
  sectionContainerClass = "shadow-md p-[16px] flex flex-col gap-[16px]",
  headerTitle,
  headerDescription,
  headerContainerClass = "flex items-center justify-between",
  deleteBtnClass = "absolute right-[-32px]",
  handleDelBtn,
}: {
  children: React.ReactNode;
  sectionContainerClass?: string;
  headerTitle: string;
  headerDescription?: string;
  headerContainerClass?: string;
  deleteBtnClass?: string;
  handleDelBtn: () => void;
}) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className={sectionContainerClass}>
      <HiddenSectionHeader
        isShown={isShown}
        setIsShown={setIsShown}
        headerTitle={headerTitle}
        headerDescription={headerDescription}
        headerContainerClass={headerContainerClass}
        hideBtnTitle={isShown ? "Hide" : "Show"}
        deleteBtnTitle={"del"}
        deleteBtnClass={deleteBtnClass}
        handleDelBtn={handleDelBtn}
      />
      {isShown && children}
    </div>
  );
};

const HiddenSectionHeader = ({
  isShown,
  setIsShown,
  headerTitle,
  headerDescription,
  headerContainerClass,
  hideBtnTitle,
  deleteBtnTitle,
  deleteBtnClass,
  handleDelBtn,
}: {
  isShown: boolean;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  headerTitle: string;
  headerDescription?: string;
  headerContainerClass?: string;
  hideBtnTitle: string;
  deleteBtnTitle: string;
  deleteBtnClass: string;
  handleDelBtn: () => void;
}) => {
  return (
    <InputWrapper
      title={headerTitle}
      description={headerDescription}
      containerClass={headerContainerClass}
    >
      <button onClick={() => setIsShown(!isShown)}>{hideBtnTitle}</button>
      <button onClick={() => handleDelBtn()} className={deleteBtnClass}>
        {deleteBtnTitle}
      </button>
    </InputWrapper>
  );
};

export { HiddenSectionWrapper, HiddenSection };
