import { useContext } from "react";
import { DropdownContext } from "./DropdownContext";

const useDropdownContext = () => {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error(
      "useDropdownContext must be used within DropdownContextProvider",
    );
  }

  return context;
};

export default useDropdownContext;
