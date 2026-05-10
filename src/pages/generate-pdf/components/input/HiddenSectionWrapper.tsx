import React, { useState } from "react";
import InputWrapper from "./InputWrapper";

const HiddenSectionWrapper = ({
  children,
  containerTitle,
  containerDescription,
  childrenContainerClass = "mt-[32px] flex flex-col gap-[32px] relative",
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

const HiddenSectionContainer = ({
  children,
  handleDelBtn,
  handleSectionUp,
  handleSectionDown,
  index,
  isFirst,
  isLast,
}: {
  children: React.ReactNode;
  handleDelBtn: () => void;
  handleSectionUp: (currentIndex: number) => void;
  handleSectionDown: (currentIndex: number) => void;
  index: number;
  isFirst: boolean;
  isLast: boolean;
}) => {
  return (
    <div className="flex items-start gap-[16px]">
      <div className="mt-[8px]">
        <button
          className={`${isFirst ? "text-gray-200" : ""}`}
          disabled={isFirst}
          onClick={() => handleSectionUp(index)}
        >
          Up
        </button>
        <button
          className={`${isLast ? "text-gray-200" : ""}`}
          disabled={isLast}
          onClick={() => handleSectionDown(index)}
        >
          Down
        </button>
      </div>
      {children}
      <button onClick={() => handleDelBtn()} className="mt-[16px]">
        del
      </button>
    </div>
  );
};

const HiddenSection = ({
  children,
  sectionContainerClass = "w-full shadow-md p-[16px] flex flex-col gap-[16px]",
  headerTitle,
  headerDescription,
  headerContainerClass = "flex items-center justify-between",
  handleDelBtn,
  handleSectionUp,
  handleSectionDown,
  index,
  isFirst,
  isLast,
}: {
  children: React.ReactNode;
  sectionContainerClass?: string;
  headerTitle: string;
  headerDescription?: string;
  headerContainerClass?: string;
  handleDelBtn: () => void;
  handleSectionUp: (currentIndex: number) => void;
  handleSectionDown: (currentIndex: number) => void;
  index: number;
  isFirst: boolean;
  isLast: boolean;
}) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <HiddenSectionContainer
      handleSectionUp={handleSectionUp}
      handleSectionDown={handleSectionDown}
      handleDelBtn={handleDelBtn}
      index={index}
      isFirst={isFirst}
      isLast={isLast}
    >
      <div className={sectionContainerClass}>
        <HiddenSectionHeader
          isShown={isShown}
          setIsShown={setIsShown}
          headerTitle={headerTitle}
          headerDescription={headerDescription}
          headerContainerClass={headerContainerClass}
          hideBtnTitle={isShown ? "Hide" : "Show"}
        />
        {isShown && children}
      </div>
    </HiddenSectionContainer>
  );
};

const HiddenSectionHeader = ({
  isShown,
  setIsShown,
  headerTitle,
  headerDescription,
  headerContainerClass,
  hideBtnTitle,
}: {
  isShown: boolean;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  headerTitle: string;
  headerDescription?: string;
  headerContainerClass?: string;
  hideBtnTitle: string;
}) => {
  return (
    <InputWrapper
      title={headerTitle}
      description={headerDescription}
      containerClass={headerContainerClass}
    >
      <button onClick={() => setIsShown(!isShown)}>{hideBtnTitle}</button>
    </InputWrapper>
  );
};

export { HiddenSectionWrapper, HiddenSection };
