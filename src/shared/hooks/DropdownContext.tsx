import React, { createContext, useState } from "react";

interface IDropdownContext {
  isShown: boolean;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownContext = createContext<IDropdownContext | undefined>(undefined);

const DropdownContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <DropdownContext.Provider value={{ isShown, setIsShown }}>
      {children}
    </DropdownContext.Provider>
  );
};

export { DropdownContextProvider, DropdownContext };
