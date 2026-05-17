import type React from "react";

import useDropdownContext from "../hooks/useDropdownContext";

import useClickOutside from "../hooks/useClickOutside";

const Dropdown = ({ children }: { children: React.ReactNode }) => {
  const { setIsShown } = useDropdownContext();

  const containerRef = useClickOutside<HTMLDivElement>(() => {
    setIsShown(false);
  });

  return (
    <div className="static" ref={containerRef}>
      {children}
    </div>
  );
};

const Trigger = ({ children }: { children: React.ReactNode }) => {
  const { setIsShown } = useDropdownContext();

  return (
    <button onClick={() => setIsShown((prev) => !prev)}>{children}</button>
  );
};

const MenuItem = ({ children }: { children: React.ReactNode }) => {
  const { isShown } = useDropdownContext();

  if (isShown) {
    return (
      <div className="absolute bg-[#eff2f9] rounded-md px-[16px] py-[8px]">
        {children}
      </div>
    );
  }
};

const MenuItems = ({
  children,
  handleClick,
}: {
  children: React.ReactNode;
  handleClick: () => void;
}) => {
  return (
    <div
      className="cursor-pointer hover:text-[#828ba2]"
      onClick={() => handleClick()}
    >
      {children}
    </div>
  );
};

Dropdown.Trigger = Trigger;
Dropdown.MenuItem = MenuItem;
Dropdown.MenuItems = MenuItems;

export default Dropdown;
