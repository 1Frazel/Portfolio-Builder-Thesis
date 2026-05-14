import { useMemo, useState } from "react";
import { Drawer, Dropdown } from "antd";

import useIsMobile from "../hooks/useIsMobile";

export interface IDropdownOption {
  label: string;
  value: string;
}

const ResponsiveDropdown = ({
  options,
  value,
  placeholder = "Select option",
  onChange,
}: {
  options: IDropdownOption[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) => {
  const isMobile = useIsMobile();
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);

  const selectedLabel = useMemo(() => {
    return options.find((option) => option.value === value)?.label;
  }, [options, value]);

  if (!isMobile) {
    return (
      <Dropdown
        trigger={["click"]}
        open={isDesktopDropdownOpen}
        onOpenChange={setIsDesktopDropdownOpen}
        destroyOnHidden
        placement="bottomLeft"
        popupRender={() => (
          <div className="min-w-[280px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsDesktopDropdownOpen(false);
                  }}
                  className={`block w-full border-b border-slate-200 px-5 py-4 text-left text-lg last:border-b-0 ${
                    isSelected
                      ? "font-semibold text-blue-700"
                      : "text-slate-800"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
      >
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-left text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
        >
          <span className={selectedLabel ? "text-slate-900" : "text-slate-500"}>
            {selectedLabel || placeholder}
          </span>
          <span className="text-slate-500">▼</span>
        </button>
      </Dropdown>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsMobileSheetOpen(true)}
        className="flex w-full items-center justify-between rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-left text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
      >
        <span className={selectedLabel ? "text-slate-900" : "text-slate-500"}>
          {selectedLabel || placeholder}
        </span>
        <span className="text-slate-500">▼</span>
      </button>

      <Drawer
        open={isMobileSheetOpen}
        placement="bottom"
        height="auto"
        closable={false}
        onClose={() => setIsMobileSheetOpen(false)}
        styles={{ body: { padding: 0 } }}
      >
        <div className="pb-2">
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsMobileSheetOpen(false);
                }}
                className={`block w-full border-b border-slate-200 px-5 py-4 text-left text-lg ${
                  isSelected ? "font-semibold text-blue-700" : "text-slate-800"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </Drawer>
    </>
  );
};

export default ResponsiveDropdown;
